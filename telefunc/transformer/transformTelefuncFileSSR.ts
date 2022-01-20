import { parse } from 'es-module-lexer'
import { assert, assertPosixPath } from '../server/utils'

export { transformTelefuncFileSSR }

async function transformTelefuncFileSSR(src: string, id: string, root: string) {
  assertPosixPath(id)
  assertPosixPath(root)

  const exportNames = parse(src)[1]
  assert(Array.isArray(exportNames as any), { src, exportNamesType: typeof exportNames })

  return {
    code: getCode(exportNames, src, id.replace(root, '')),
    map: null,
  }
}

function getCode(exportNames: readonly string[], src: string, filePath: string) {
  assertPosixPath(filePath)

  let code = 'import { __internal_addTelefunction } from "telefunc";'
  code += '\n'
  code += src
  code += '\n'
  for (const exportName of exportNames) {
    code += `__internal_addTelefunction("${exportName}", ${exportName}, "${filePath}");`
    code += '\n'
  }

  return code
}
