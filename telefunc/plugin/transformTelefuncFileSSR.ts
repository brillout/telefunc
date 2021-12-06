import { parse } from 'es-module-lexer'
import { assertPosixPath } from '../server/utils'

export { transformTelefuncFileSSR }

async function transformTelefuncFileSSR(src: string, id: string, root: string) {
  assertPosixPath(id)
  assertPosixPath(root)

  const exports = parse(src)[1]

  return {
    code: getCode(exports, src, id.replace(root, '')),
    map: null,
  }
}

function getCode(exports: readonly string[], src: string, filePath: string) {
  assertPosixPath(filePath)

  let code = 'import { __internal_addTelefunction } from "telefunc";'
  code += '\n'
  code += src
  code += '\n'
  for (const exportName of exports) {
    code += `__internal_addTelefunction("${exportName}", ${exportName}, "${filePath}");`
    code += '\n'
  }

  return code
}
