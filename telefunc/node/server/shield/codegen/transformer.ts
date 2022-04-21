export { generateShield }

import { readFileSync } from 'fs'
import { Project, VariableDeclarationKind } from 'ts-morph'
import { assert, assertWarning } from '../../../utils'

const typesSrc = readFileSync(`${__dirname}/types.d.ts`).toString()

const generateShield = (
  telefuncSrc: string
): string => {
  const project = new Project({
    compilerOptions: {
      strict: true
    }
  })

  project.createSourceFile("types.ts", typesSrc)
  const telefuncSourceFile = project.createSourceFile("telefunc.ts", telefuncSrc)
  // this source file is used for evaluating the template literal types' values
  const shieldStrSourceFile = project.createSourceFile("shield-str.ts")

  shieldStrSourceFile.addImportDeclaration({
    moduleSpecifier: "./types",
    namedImports: ["ShieldArrStr"]
  })

  const teleFunctions = telefuncSourceFile.getFunctions().filter(fun => fun.isExported())
  const teleFunNames = teleFunctions.flatMap(fun => {
    const name = fun.getName()
    if (!name) return []
    return [name]
  })
  shieldStrSourceFile.addImportDeclaration({
    moduleSpecifier: "./telefunc",
    namedImports: teleFunNames
  })

  const tAlias = '__shieldGenerator_t'  // alias for shield.t
  // assign the template literal type to a string
  // then diagnostics are used to get the value of the template literal type
  for (const teleFunName of teleFunNames) {
    shieldStrSourceFile.addTypeAlias({
      name: `${teleFunName}Shield`,
      type: `ShieldArrStr<Parameters<typeof ${teleFunName}>>`
    })
  }

  const shieldAlias = '__shieldGenerator_shield'  // alias for shield
  // TODO: do users ever want to add shield() calls themselves?
  // in that case we should detect if it has already been imported
  // and skip auto-generating a shield() call
  telefuncSourceFile.addImportDeclaration({
    moduleSpecifier: 'telefunc',
    namedImports: [{
      name: 'shield',
      alias: shieldAlias
    }]
  })
  telefuncSourceFile.addVariableStatement({
    declarationKind: VariableDeclarationKind.Const,
    declarations: [{
      name: tAlias,
      initializer: `${shieldAlias}.type`,
    }]
  })

  for (const teleFunName of teleFunNames) {
    const typeAlias = shieldStrSourceFile.getTypeAlias(`${teleFunName}Shield`)
    assert(typeAlias, `Failed to get typeAlias '${teleFunName}Shield'.`)

    const shieldStr = typeAlias.getType().getLiteralValue()

    if (!shieldStr || typeof shieldStr !== 'string') {
      assertWarning(false, `Failed to generate shield() for telefunction '${teleFunName}'`)
      continue
    }
    const shieldStrWithAlias = shieldStr.replace(/t\./g, `${tAlias}.`)
    telefuncSourceFile.addStatements(`${shieldAlias}(${teleFunName}, ${shieldStrWithAlias}, { __generated: true })`)
  }

  return telefuncSourceFile.getText()
}