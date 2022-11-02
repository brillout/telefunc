export { transformTelefuncFileClientSideSync }

import { posix } from 'path'
import { assert, assertPosixPath } from '../utils'

function transformTelefuncFileClientSideSync(
  id: string,
  appRootDir: string,
  exportNames: readonly string[] | string[]
) {
  assertPosixPath(id)
  assertPosixPath(appRootDir)

  const telefuncFilePath = '/' + posix.relative(appRootDir, id)
  assert(!telefuncFilePath.startsWith('/.'))
  assertPosixPath(telefuncFilePath)

  const code = getCode(exportNames, telefuncFilePath)
  return code
}

export function getCode(exportNames: readonly string[], telefuncFilePath: string) {
  const lines: string[] = []

  lines.push('// @ts-nocheck')

  lines.push(`import { __remoteTelefunctionCall } from 'telefunc/client';`)

  exportNames.forEach((exportName) => {
    const varName = exportName === 'default' ? 'defaultExport' : exportName

    lines.push(
      `const ${varName} =  (...args) => __remoteTelefunctionCall('${telefuncFilePath}', '${exportName}', args);`
    )

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
