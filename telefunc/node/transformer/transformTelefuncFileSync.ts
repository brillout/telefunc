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
  const lines: string[] = []

  lines.push('// @ts-nocheck')

  lines.push(`import { __internal_fetchTelefunc } from 'telefunc/client';`)

  exportNames.forEach((exportName) => {
    const varName = exportName === 'default' ? 'defaultExport' : exportName

    lines.push(`const ${varName} =  (...args) => __internal_fetchTelefunc('${telefuncFilePath}', '${exportName}', args);`)

    {
      assert(!telefuncFilePath.includes(':'))
      const key = `${telefuncFilePath}:${exportName}`
      lines.push(`${varName}._key = ${JSON.stringify(key)};`)
    }

    if (exportName === 'default') {
      lines.push(`export default ${varName};`)
    } else {
      lines.push(`export { ${varName} };`)
    }
  })

  const code = lines.join('\n')
  return code
}
