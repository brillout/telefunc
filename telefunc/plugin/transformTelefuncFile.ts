import { init, parse } from 'es-module-lexer'
import { posix } from 'path'
import { assert } from '../server/utils'
import { assertPosixPath } from '../server/utils/assertPosixPath'

export { transformTelefuncFile }

async function transformTelefuncFile(src: string, id: string, root: string, packageJsonExportsSupported = true) {
  assertPosixPath(id)
  assertPosixPath(root)

  const telefuncFilePath = '/' + posix.relative(root, id)
  assert(!telefuncFilePath.startsWith('/.'))
  assertPosixPath(telefuncFilePath)

  await init

  const exports = parse(src)[1]
  return {
    code: getCode(exports, telefuncFilePath, packageJsonExportsSupported),
    map: null,
  }
}

function getCode(exports: readonly string[], telefuncFilePath: string, packageJsonExportsSupported: boolean) {
  let code = `import { __internal_fetchTelefunc } from '${
    packageJsonExportsSupported ? 'telefunc/client' : 'telefunc/dist/esm/client'
  }';`
  code += '\n'

  exports.forEach((exportName) => {
    const exportValue = `(...args) => __internal_fetchTelefunc('${telefuncFilePath}', '${exportName}', args);`
    if (exportName === 'default') {
      code += `export default ${exportValue}`
    } else {
      code += `export const ${exportName} = ${exportValue};`
    }
    code += '\n'
  })
  return code
}
