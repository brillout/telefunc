export { generateShield }
export { replaceShieldTypeAlias }
export { printGenStatus }
export { testGenerateShield }

import { Project, VariableDeclarationKind, SourceFile, getCompilerOptionsFromTsConfig } from 'ts-morph'
import {
  assert,
  assertUsage,
  assertWarning,
  assertModuleScope,
  objectAssign,
  unique,
  projectInfo
} from '../../../utils'
import fs from 'fs'
import path from 'path'
import pc from 'picocolors'

type GeneratedShield = {
  telefuncFilePath: string
  telefunctionName: string
  failed: boolean
  project: Project & { tsConfigFilePath: null | string }
}

assertModuleScope('codegen/generateShield.ts')
const generatedShields: GeneratedShield[] = []
const projects: Record<string, Project> = {}

function generateShield(telefuncFileCode: string, telefuncFilePath: string): string {
  const { project, telefuncFileSource, shieldGenSource } = getProject(telefuncFilePath, telefuncFileCode)
  // We should preserve prior `telefuncFileCode` transformations
  telefuncFileSource.replaceWithText(telefuncFileCode)
  return generate({ project, telefuncFileSource, shieldGenSource, telefuncFilePath })
}

function getProject(telefuncFilePath: string, telefuncFileCode: string) {
  const tsConfigFilePath = findTsConfig(telefuncFilePath)
  const key = tsConfigFilePath ?? '__no_tsconfig'
  const typeToShieldFilePath = path.join(getFilsystemRoot(), '__telefunc_typeToShield.ts')

  if (!projects[key]) {
    let project: Project
    if (!tsConfigFilePath) {
      project = projects[key] = new Project({
        compilerOptions: {
          strict: true
        }
      })

      assert(project.getSourceFiles(telefuncFilePath).length === 0)
      project.createSourceFile(
        telefuncFilePath,
        telefuncFileCode,
        // We need `overwrite` because `telefuncFilePath` already exists on the filesystem
        { overwrite: true }
      )
    } else {
      project = projects[key] = new Project({
        tsConfigFilePath,
        // Add all project files, which is needed for picking up the Telefunc.Context value
        //  - What `Telefunc.Context` is, is explained at https://telefunc.com/typescript#getcontext
        skipAddingFilesFromTsConfig: false
      })

      const compilerOptions = getCompilerOptionsFromTsConfig(tsConfigFilePath)
      assertUsage(
        compilerOptions.options.strict === true,
        `Set \`compilerOptions.strict\` to \`true\` in ${tsConfigFilePath} (needed for shield() generation)`
      )
    }

    // This source file is used for evaluating the template literal types' values
    project.createSourceFile(typeToShieldFilePath, getTypeToShieldSrc())
  }

  const project = projects[key]!
  objectAssign(project, { tsConfigFilePath })

  const shieldGenFilePath = path.join(
    path.dirname(telefuncFilePath),
    `__telefunc_shieldGen_${path.basename(telefuncFilePath)}`
  )
  const shieldGenSource = project.createSourceFile(shieldGenFilePath)
  shieldGenSource.addImportDeclaration({
    moduleSpecifier: getImportPath(shieldGenFilePath, typeToShieldFilePath),
    namedImports: ['ShieldArrStr']
  })

  const files = project.getSourceFiles(telefuncFilePath)
  assert(files.length <= 1)
  const telefuncFileSource = files[0]
  if (!telefuncFileSource) {
    const sourceFiles = project.getSourceFiles().map(getSourceFilePath)
    assert(false, { telefuncFileSource, sourceFiles })
  }

  return { project, telefuncFileSource, shieldGenSource }
}

function generate({
  project,
  telefuncFileSource,
  shieldGenSource,
  telefuncFilePath
}: {
  project: Project & { tsConfigFilePath: null | string }
  telefuncFileSource: SourceFile
  shieldGenSource: SourceFile
  telefuncFilePath: string
}): string {
  const telefunctions = telefuncFileSource.getFunctions().filter((f) => f.isExported())
  const telefunctionNames = telefunctions.flatMap((telefunction) => {
    const name = telefunction.getName()
    if (!name) return []
    return [name]
  })

  shieldGenSource.addImportDeclaration({
    moduleSpecifier: getTelefuncFileImportPath(telefuncFilePath),
    namedImports: telefunctionNames
  })

  // assign the template literal type to a string
  // then diagnostics are used to get the value of the template literal type
  for (const telefunctionName of telefunctionNames) {
    shieldGenSource.addTypeAlias({
      name: getShieldName(telefunctionName),
      type: `ShieldArrStr<Parameters<typeof ${telefunctionName}>>`
    })
  }

  const shieldAlias = '__shieldGenerator_shield' // alias for shield
  telefuncFileSource.addImportDeclaration({
    moduleSpecifier: 'telefunc',
    namedImports: [
      {
        name: 'shield',
        alias: shieldAlias
      }
    ]
  })
  telefuncFileSource.addVariableStatement({
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: tAlias,
        initializer: `${shieldAlias}.type`
      }
    ]
  })

  // Add the dependent source files to the project
  project.resolveSourceFileDependencies()

  // We need `compilerOptions.strict` to avoid `TS2589: Type instantiation is excessively deep and possibly infinite.`
  assert(project.compilerOptions.get().strict === true)

  for (const telefunctionName of telefunctionNames) {
    const typeAliasName = getShieldName(telefunctionName)
    const typeAlias = shieldGenSource.getTypeAlias(typeAliasName)
    assert(typeAlias, `Failed to get type alias \`${typeAliasName}\`.`)

    const shieldStrType = typeAlias.getType()
    const shieldStr = shieldStrType.getLiteralValue()
    assert(shieldStr === undefined || typeof shieldStr === 'string')

    const failed = shieldStr === undefined

    generatedShields.push({
      project,
      telefuncFilePath,
      telefunctionName,
      failed
    })

    if (failed) continue

    const shieldStrWithAlias = replaceShieldTypeAlias(shieldStr)
    telefuncFileSource.addStatements(
      `${shieldAlias}(${telefunctionName}, ${shieldStrWithAlias}, { __autoGenerated: true })`
    )
  }

  const shieldCode = telefuncFileSource.getText()
  return shieldCode
}

function testGenerateShield(telefuncFileCode: string): string {
  const project = new Project({
    compilerOptions: {
      strict: true
    }
  })
  objectAssign(project, { tsConfigFilePath: null })

  const telefuncFilePath = 'virtual.telefunc.ts'

  const telefuncFileSource = project.createSourceFile(telefuncFilePath, telefuncFileCode)

  project.createSourceFile('typeToShield.ts', getTypeToShieldSrc())

  const shieldGenSource = project.createSourceFile('shieldGen.ts')
  shieldGenSource.addImportDeclaration({
    moduleSpecifier: './typeToShield',
    namedImports: ['ShieldArrStr']
  })

  return generate({
    project,
    telefuncFileSource,
    shieldGenSource,
    telefuncFilePath
  })
}

function getImportPath(importer: string, importedFile: string) {
  let importPath = path.relative(path.dirname(importer), importedFile)
  importPath = toImport(importPath)
  return importPath
}

function getTelefuncFileImportPath(telefuncFilePath: string) {
  let importPath = path.basename(telefuncFilePath)
  importPath = toImport(importPath)
  return importPath
}

function toImport(importPath: string) {
  assert(importPath.endsWith('.ts'))
  importPath = importPath.slice(0, -1 * '.ts'.length)
  if (process.platform === 'win32') {
    importPath = importPath.split('\\').join('/')
  }
  return `./${importPath}`
}

function printGenStatus(root: string) {
  // Is empty for JavaScript users
  if (generatedShields.length === 0) return
  printIntroForVite()
  printSuccesses(root)
  printFailures(root)
}

function printIntroForVite() {
  console.log(`${pc.cyan(`telefunc v${projectInfo.projectVersion}`)} ${pc.green('shield() generation')}`)
}

function printFailures(root: string) {
  const failures = generatedShields.filter((s) => s.failed)

  const projects = unique(failures.map((f) => f.project))

  let hasTypeScriptErrors = false
  projects.forEach((project) => {
    const diagnostics = project.getPreEmitDiagnostics()
    if (diagnostics.length > 0) {
      hasTypeScriptErrors = true
      if (project.tsConfigFilePath) {
        console.log(`TypeScript project ${pc.bold(project.tsConfigFilePath)} errors:`)
      } else {
        console.log(`TypeScript errors:`)
      }
      console.log(project.formatDiagnosticsWithColorAndContext(diagnostics))
    }
  })

  const docsLink = 'https://telefunc.com/shield#typescript'
  assertWarning(
    failures.length === 0,
    [
      'Failed to generate shield() for telefunction',
      failures.length === 1 ? '' : 's',
      ' ',
      formatGeneratedShields(failures, root),
      '. ',
      hasTypeScriptErrors
        ? `TypeScript errors (printed above) can be problematic for shield() generation. Fix your TypeScript errors and try again. See ${docsLink} for more information.`
        : `See ${docsLink} for how to fix this.`
    ].join(''),
    { onlyOnce: true }
  )
}

function printSuccesses(root: string) {
  const successes = generatedShields.filter((s) => !s.failed)
  const hasFailures = successes.length < generatedShields.length
  if (successes.length > 0) {
    console.log(
      [
        pc.green('✓'),
        `${successes.length} shield() generated`,
        (() => {
          const onlyOne = successes.length === 1
          if (!hasFailures) {
            return `covering ${onlyOne ? 'the telefunction' : 'all telefunctions'}:`
          } else {
            return `for the telefunction${onlyOne ? '' : 's'}:`
          }
        })(),
        formatGeneratedShields(successes, root)
      ].join(' ')
    )
  }
}

function formatGeneratedShields(generatedShields: GeneratedShield[], root: string) {
  return formatList(
    generatedShields.map(({ telefunctionName, telefuncFilePath }) => {
      telefuncFilePath = path.relative(root, telefuncFilePath)
      return `${pc.bold(telefunctionName + '()')} (${telefuncFilePath})`
    })
  )
}

function formatList(list: string[]): string {
  return new Intl.ListFormat('en').format(list)
}

function getShieldName(telefunctionName: string) {
  return `${telefunctionName}Shield`
}

let typeToShieldSrc: string | undefined
function getTypeToShieldSrc() {
  if (!typeToShieldSrc) {
    try {
      // For build `dist/`
      typeToShieldSrc = fs.readFileSync(`${__dirname}/typeToShield.d.ts`).toString()
    } catch {
      // For Vitest
      typeToShieldSrc = fs.readFileSync(`${__dirname}/typeToShield.ts`).toString()
    }
  }
  assert(typeToShieldSrc)
  assert(typeToShieldSrc.includes('SimpleType'))
  return typeToShieldSrc
}

function findTsConfig(telefuncFilePath: string): string | null {
  assert(fs.existsSync(telefuncFilePath))
  let curr = telefuncFilePath
  do {
    const dir = path.dirname(curr)
    if (dir === curr) {
      return null
    }
    const tsConfigFilePath = path.join(dir, 'tsconfig.json')
    if (fs.existsSync(tsConfigFilePath)) {
      return tsConfigFilePath
    }
    curr = dir
  } while (true)
}

const tAlias = '__shieldGenerator_t' // alias for shield.t
function replaceShieldTypeAlias(shieldStr: string): string {
  return shieldStr.replace(/(?<!t.const\('(?!'\)).*)t\./g, `${tAlias}.`)
}

function getSourceFilePath(sourceFile: SourceFile): string[] {
  // @ts-expect-error
  return sourceFile._compilerNode.fileName
}

function getFilsystemRoot(): string {
  if (process.platform !== 'win32') {
    return '/'
  }
  const fsRoot = process.cwd().split(path.sep)[0]
  assert(fsRoot)
  return fsRoot
}
