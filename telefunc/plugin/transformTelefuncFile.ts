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
  const lines = []

  lines.push('// @ts-nocheck')

  const importPath = packageJsonExportsSupported ? 'telefunc/client' : 'telefunc/dist/esm/client'
  lines.push(`import { __internal_fetchTelefunc } from '${importPath}';`)

  exports.forEach((exportName) => {
    const exportValue = `(...args) => __internal_fetchTelefunc('${telefuncFilePath}', '${exportName}', args);`
    if (exportName === 'default') {
      lines.push(`export default ${exportValue}`)
    } else {
      lines.push(`export const ${exportName} = ${exportValue};`)
    }
  })

  const code = lines.join('\n')
  return code
}
