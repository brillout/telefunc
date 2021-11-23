import { init, parse } from 'es-module-lexer'
import { posix } from 'path'
import { assert } from '../server/utils'
import { assertPosixPath } from '../server/utils/assertPosixPath'

export { transformTelefuncFile }

async function transformTelefuncFile(src: string, id: string, root: string) {
  assertPosixPath(id)
  assertPosixPath(root)

  const filepath = '/' + posix.relative(root, id)
  assert(!filepath.startsWith('/.'))
  assertPosixPath(filepath)

  await init

  const exports = parse(src)[1]
  return {
    code: getCode(exports, filepath),
    map: null,
  }
}

function getCode(exports: readonly string[], filePath: string) {
  let code = `import { server } from 'telefunc/client';

`
  exports.forEach((exportName) => {
    if (exportName === 'default') {
      code += `export default server['${filePath}:${exportName}'];\n`
    } else {
      code += `export const ${exportName} = server['${filePath}:${exportName}'];\n`
    }
  })
  return code
}
