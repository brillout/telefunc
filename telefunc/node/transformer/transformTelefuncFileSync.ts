export { transformTelefuncFileSync }

import { posix } from 'path'
import { assert, assertPosixPath } from '../utils'

function transformTelefuncFileSync(id: string, root: string, exportNames: readonly string[] | string[]) {
  assertPosixPath(id)
  assertPosixPath(root)

  const telefuncFilePath = '/' + posix.relative(root, id)
  assert(!telefuncFilePath.startsWith('/.'))
  assertPosixPath(telefuncFilePath)

  return {
    code: getCode(exportNames, telefuncFilePath),
    map: null
  }
}

export function getCode(exportNames: readonly string[], telefuncFilePath: string) {
  const lines = []

  lines.push('// @ts-nocheck')

  lines.push(`import { __internal_fetchTelefunc } from 'telefunc/client';`)

  exportNames.forEach((exportName) => {
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
