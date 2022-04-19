export { generateShield }

import { Project, VariableDeclarationKind } from 'ts-morph'

function parseEmitMessages(messages: string[]) {
  const matcher = /Type '"([A-Za-z0-9_]+)"' is not assignable to type '"([^"]+)"'./
  const teleFuncToShieldStr: Record<string, string> = {}

  for (let message of messages) {
    const found = message.match(matcher)
    if (!found) {
      console.warn("Encountered unrecognized emit message: ", message)
      continue
    }
    if (found.length !== 3) {
      console.warn(`Captured ${found.length - 1} groups with message: `, message)
      continue
    }

    teleFuncToShieldStr[found[1]] = found[2]
  }
  return teleFuncToShieldStr
}

const generateShield = (
  telefuncSrc: string,
  typesSrc: string
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
    shieldStrSourceFile.addVariableStatement({
      declarations: [{
        name: `${teleFunName}Shield`,
        type: `ShieldArrStr<Parameters<typeof ${teleFunName}>, '${tAlias}'>`,
        initializer: `'${teleFunName}'`
      }]
    })
  }

  const diagnostics = shieldStrSourceFile.getPreEmitDiagnostics()
  const messages = diagnostics.map(d => d.getMessageText().toString())
  const teleFunToShieldString = parseEmitMessages(messages)

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
      name: '__shieldGenerator_t',
      initializer: `${shieldAlias}.type`,
    }]
  })

  for (const teleFunName of teleFunNames) {
    const shieldStr = teleFunToShieldString[teleFunName]
    if (!shieldStr) {
      console.warn(`Failed to generate shield() call for telefunction '${teleFunName}'`)
      continue
    }
    telefuncSourceFile.addStatements(`${shieldAlias}(${teleFunName}, ${shieldStr}, { __generated: true })`)
  }

  return telefuncSourceFile.getText()
}