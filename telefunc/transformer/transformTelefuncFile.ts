export { transformTelefuncFile }

import { getExportNames } from './getExportNames'
import { posix } from 'path'
import { assert } from '../server/utils'
import { assertPosixPath } from '../server/utils/assertPosixPath'

async function transformTelefuncFile(src: string, id: string, root: string) {
  assertPosixPath(id)
  assertPosixPath(root)

  const telefuncFilePath = '/' + posix.relative(root, id)
  assert(!telefuncFilePath.startsWith('/.'))
  assertPosixPath(telefuncFilePath)

  const exportNames = await getExportNames(src)

  return {
    code: getCode(exportNames, telefuncFilePath),
    map: null,
  }
}

function getCode(exportNames: readonly string[], telefuncFilePath: string) {
  const lines = []

  lines.push('// @ts-nocheck')

  /* Nuxt v2 doesn't seem to support `package.json#exports`
  const importPath =  'telefunc/client'
  /*/
  // This also works for Vite thanks to `package.json#exports["./dist/esm/client"]`
  const importPath = 'telefunc/dist/esm/client'
  //*/

  lines.push(`import { __internal_fetchTelefunc } from '${importPath}';`)

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
