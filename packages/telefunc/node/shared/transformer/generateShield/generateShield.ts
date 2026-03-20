export { generateShield }
export { logResult }

// For ./generateShield.spec.ts
export { testGenerateShield }

import { Project, SourceFile, getCompilerOptionsFromTsConfig } from 'ts-morph'
import { assert, assertUsage, assertWarning } from '../../../../utils/assert.js'
import { assertModuleScope } from '../../../../utils/assertModuleScope.js'
import { getRandomId } from '../../../../utils/getRandomId.js'
import { objectAssign } from '../../../../utils/objectAssign.js'
import { assertPosixPath } from '../../../../utils/path.js'
import { unique } from '../../../../utils/unique.js'
import { type ExportList, getExportList } from '../getExportList.js'
import fs from 'node:fs'
import path from 'node:path'
import pc from '@brillout/picocolors'
import { fileURLToPath } from 'node:url'
const __dirname_ = path.dirname(fileURLToPath(import.meta.url))

type GeneratedShield = {
  telefuncFilePath: string
  telefunctionName: string
  failed: boolean
  project: Project & { tsConfigFilePath: null | string }
}

assertModuleScope('generateShield/generateShield.ts')
const generatedShields: GeneratedShield[] = []
let resultAlreadyLogged = false
const projects: Record<string, Project> = {}

function generateShield(
  telefuncFileCode: string,
  telefuncFilePath: string,
  appRootDir: string,
  exportList: ExportList,
): string {
  const { project, shieldGenSource } = getProject(telefuncFilePath, telefuncFileCode, appRootDir)
  const shieldCode = generateShieldCode({
    project,
    shieldGenSource,
    telefuncFilePath,
    exportList,
  })
  return shieldCode
}

function getProject(telefuncFilePath: string, telefuncFileCode: string, appRootDir: string, isTest?: true) {
  const tsConfigFilePath = isTest ? null : findTsConfig(telefuncFilePath, appRootDir)
  const key = tsConfigFilePath ?? '__no_tsconfig'
  const typeToShieldFilePath = path.join(getFilesystemRoot(), '__telefunc_TypeToShield.ts')
  // When shield() generation fails, avoid showing unrelated errors in TypeScript diagnostics
  const tsConfigAddendum = { skipLibCheck: true }

  if (!projects[key]) {
    let project: Project
    if (!tsConfigFilePath) {
      project = projects[key] = new Project({
        compilerOptions: {
          ...tsConfigAddendum,
          // See assertUsage() comment
          strict: true,
        },
      })
    } else {
      project = projects[key] = new Project({
        tsConfigFilePath,
        // Add all project files, which is needed for picking up the Telefunc.Context value
        //  - What `Telefunc.Context` is, is explained at https://telefunc.com/getContext#typescript
        skipAddingFilesFromTsConfig: false,
        compilerOptions: {
          ...tsConfigAddendum,
        },
      })

      const compilerOptionsUser = getCompilerOptionsFromTsConfig(tsConfigFilePath)
      // We need `compilerOptions.strict` to avoid `TS2589: Type instantiation is excessively deep and possibly infinite.`
      assertUsage(
        compilerOptionsUser.options.strict === true,
        `Set \`compilerOptions.strict\` to \`true\` in ${tsConfigFilePath} (needed for shield() generation)`,
      )
    }

    const compilerOptionsResolved = project.compilerOptions.get()
    assert(compilerOptionsResolved.strict === true)
    assert(compilerOptionsResolved.skipLibCheck === true)

    // This source file is used for evaluating the template literal types' values
    project.createSourceFile(typeToShieldFilePath, getTypeToShieldSrc())
  }
  const project = projects[key]!
  objectAssign(project, { tsConfigFilePath })

  if (!tsConfigFilePath) {
    assert(!project.getSourceFile(telefuncFilePath))
    project.createSourceFile(
      telefuncFilePath,
      telefuncFileCode,
      // We need `overwrite` because `telefuncFilePath` already exists on the filesystem
      { overwrite: true },
    )
  }

  const shieldGenFilePath = path.join(
    path.dirname(telefuncFilePath),
    `__telefunc_shieldGen_${path.basename(telefuncFilePath)}`,
  )
  const shieldGenSource = project.createSourceFile(shieldGenFilePath, undefined, { overwrite: true })
  shieldGenSource.addImportDeclaration({
    moduleSpecifier: getImportPath(shieldGenFilePath, typeToShieldFilePath),
    namedImports: ['TypeToShield'],
  })

  const telefuncFileSource = project.getSourceFile(telefuncFilePath)
  assertTelefuncFilesSource(telefuncFileSource, { project, telefuncFilePath, tsConfigFilePath, appRootDir })
  // The code written in the file at `telefuncFilePath` isn't equal `telefuncFileCode` because of transforms
  telefuncFileSource.replaceWithText(telefuncFileCode)

  return { project, shieldGenSource }
}

function generateShieldCode({
  project,
  shieldGenSource,
  telefuncFilePath,
  exportList,
}: {
  project: Project & { tsConfigFilePath: null | string }
  shieldGenSource: SourceFile
  telefuncFilePath: string
  // All exports of `.telefunc.js` files must be functions, thus we generate a shield() for each export.
  // If an export isn't a function then the error message is a bit ugly: https://github.com/brillout/telefunc/issues/142
  exportList: ExportList
}): string {
  shieldGenSource.addImportDeclaration({
    moduleSpecifier: getTelefuncFileImportPath(telefuncFilePath),
    namedImports: exportList.map((e) => e.exportName),
  })

  // Assign the template literal type to a string, then diagnostics are used to get the value of the template literal type.
  for (const e of exportList) {
    const typeAlias = shieldGenSource.addTypeAlias({
      name: getShieldName(e.exportName),
      type: `TypeToShield<typeof ${e.exportName}>`,
    })
    // Suppress TypeScript error TS6196 "is declared but never used"
    // https://github.com/brillout/telefunc/issues/229
    shieldGenSource.insertText(
      typeAlias.getStart(),
      '// @ts-ignore Used internally by Telefunc at compile time (not runtime)\n',
    )
  }

  let shieldCode = [
    'import { shield as __telefunc_shield } from "telefunc";',
    'const __telefunc_t = __telefunc_shield.type;',
  ].join('\n')

  // Add the dependent source files to the project
  project.resolveSourceFileDependencies()

  assert(project.compilerOptions.get().strict === true)

  for (const exportedFunction of exportList) {
    const typeAliasName = getShieldName(exportedFunction.exportName)
    const typeAlias = shieldGenSource.getTypeAlias(typeAliasName)
    assert(typeAlias, `Failed to get type alias \`${typeAliasName}\`.`)

    const shieldStrType = typeAlias.getType()
    const shieldStr = shieldStrType.getLiteralValue()
    assert(shieldStr === undefined || typeof shieldStr === 'string')

    if (shieldStr === 'NON_FUNCTION_EXPORT') continue

    const failed = shieldStr === undefined

    generatedShields.push({
      project,
      telefuncFilePath,
      telefunctionName: exportedFunction.exportName,
      failed,
    })

    if (failed) continue

    shieldCode += '\n'
    shieldCode += `__telefunc_shield(${exportedFunction.localName}, ${shieldStr}, { __autoGenerated: true });`
  }

  // We don't need the source file anymore now that we have `shieldCode`
  shieldGenSource.delete()

  shieldCode += '\n'
  return shieldCode
}

async function testGenerateShield(telefuncFileCode: string): Promise<string> {
  const telefuncFilePath = `virtual-${getRandomId()}.telefunc.ts`
  const { project, shieldGenSource } = getProject(telefuncFilePath, telefuncFileCode, '/fake-user-root-dir/', true)
  objectAssign(project, { tsConfigFilePath: null })
  const exportList = await getExportList(telefuncFileCode)
  const shieldCode = generateShieldCode({
    project,
    shieldGenSource,
    telefuncFilePath,
    exportList,
  })
  return shieldCode
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

function logResult(appRootDir: string, logSuccessPrefix: string, logIntro: null | string) {
  // `generatedShields` is empty for JavaScript users
  if (generatedShields.length === 0) return
  if (resultAlreadyLogged) {
    assert(generatedShields.length === 0)
    return
  }
  if (logIntro) console.log(logIntro)
  printSuccesses(appRootDir, logSuccessPrefix)
  printFailures(appRootDir)
  resultAlreadyLogged = true
  generatedShields.length = 0
}

function printFailures(appRootDir: string) {
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

  assertWarning(
    failures.length === 0,
    [
      'Failed to generate shield() for telefunction',
      failures.length === 1 ? '' : 's',
      ' ',
      formatGeneratedShields(failures, appRootDir),
      '.',
      !hasTypeScriptErrors
        ? ''
        : ' TypeScript errors (printed above) can be problematic for shield() generation. Fix your TypeScript errors and try again.',
      ' See https://telefunc.com/shield#typescript-automatic for more information.',
    ].join(''),
    { onlyOnce: true },
  )
}

function printSuccesses(appRootDir: string, logSuccessPrefix: string) {
  const successes = generatedShields.filter((s) => !s.failed)
  if (successes.length > 0) {
    console.log(
      [
        logSuccessPrefix,
        `shield() generated for the telefunction${generatedShields.length === 1 ? '' : 's'}`,
        formatGeneratedShields(successes, appRootDir),
      ].join(' '),
    )
  }
}

function formatGeneratedShields(generatedShields: GeneratedShield[], appRootDir: string) {
  return formatList(
    generatedShields.map(({ telefunctionName, telefuncFilePath }) => {
      telefuncFilePath = path.relative(appRootDir, telefuncFilePath)
      return `${telefunctionName}() (${telefuncFilePath})`
    }),
  )
}

function formatList(list: string[]): string {
  return new Intl.ListFormat('en').format(list)
}

function getShieldName(telefunctionName: string) {
  return `${telefunctionName}Shield` as const
}

let typeToShieldFileSrc: string | undefined
function getTypeToShieldSrc() {
  if (!typeToShieldFileSrc) {
    try {
      typeToShieldFileSrc = fs.readFileSync(`${__dirname_}/TypeToShield.d.ts`).toString()
    } catch {
      typeToShieldFileSrc = fs.readFileSync(`${__dirname_}/TypeToShield.ts`).toString()
    }
  }
  assert(typeToShieldFileSrc)
  assert(typeToShieldFileSrc.includes('SimpleType'))
  return typeToShieldFileSrc
}

function findTsConfig(telefuncFilePath: string, appRootDir: string): string | null {
  assert(fs.existsSync(telefuncFilePath))
  assertPosixPath(telefuncFilePath)
  assertPosixPath(appRootDir)
  assert(telefuncFilePath.startsWith(appRootDir))
  let curr = telefuncFilePath
  do {
    const dir = path.dirname(curr)
    if (dir === curr) {
      return null
    }
    if (!dir.startsWith(appRootDir)) {
      return null
    }
    const tsConfigFilePath = path.join(dir, 'tsconfig.json')
    if (fs.existsSync(tsConfigFilePath)) {
      return tsConfigFilePath
    }
    curr = dir
  } while (true)
}

function getFilesystemRoot(): string {
  if (process.platform !== 'win32') {
    return '/'
  }
  const fsRoot = process.cwd().split(path.sep)[0]
  assert(fsRoot)
  return fsRoot
}

function assertTelefuncFilesSource(
  telefuncFileSource: SourceFile | undefined,
  {
    telefuncFilePath,
    project,
    tsConfigFilePath,
    appRootDir,
  }: {
    telefuncFilePath: string
    project: Project
    tsConfigFilePath: string | null
    appRootDir: string
  },
): asserts telefuncFileSource is SourceFile {
  if (telefuncFileSource) {
    return
  }

  const sourceFiles: string[] = project.getSourceFiles().map(
    (sourceFile) =>
      // @ts-expect-error
      sourceFile._compilerNode.fileName,
  )
  if (tsConfigFilePath) {
    const userTsFiles = sourceFiles.filter((filePath) => !filePath.includes('__telefunc_'))
    const msg1 = `The TypeScript configuration ${tsConfigFilePath} doesn't seem to include`
    const msg2 = `Make sure to configure the ${pc.cyan('include')} and ${pc.cyan('exclude')} (or ${pc.cyan(
      'files',
    )}) options of that tsconfig.json` as const
    if (userTsFiles.length === 0) {
      assertUsage(
        false,
        [`${msg1} any file (i.e. it includes 0 files).`, `${msg2} to match at least one file.`].join(' '),
      )
    } else {
      assertUsage(
        false,
        [
          `${msg1} the ${telefuncFilePath} file.`,
          `${msg2} to match the ${telefuncFilePath} file.`,
          `It currently matches the following files:\n${userTsFiles.map((f) => `  ${f}`).join('\n')}`,
        ].join(' '),
      )
    }
  } else {
    const debugInfo = JSON.stringify(
      {
        telefuncFilePath,
        sourceFiles,
        tsConfigFilePath,
        appRootDir,
      },
      null,
      2,
    )
    assert(false, debugInfo)
  }
}
