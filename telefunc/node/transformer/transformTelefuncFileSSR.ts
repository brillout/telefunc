export { transformTelefuncFileSSR }

import { getExportNames } from './getExportNames'
import { assertPosixPath } from '../utils'

async function transformTelefuncFileSSR(src: string, id: string, root: string) {
  assertPosixPath(id)
  assertPosixPath(root)

  const exportNames = await getExportNames(src)

  return {
    code: getCode(exportNames, src, id.replace(root, '')),
    map: null
  }
}

function getCode(exportNames: readonly string[], src: string, filePath: string) {
  assertPosixPath(filePath)

  const telefuncImport = 'import { __internal_addTelefunction } from "telefunc";'

  // No break line between `telefuncImport` and `src` in order to preserve the source map's line mapping
  let code = telefuncImport + src

  code += '\n\n'
  for (const exportName of exportNames) {
    code += `__internal_addTelefunction(${exportName}, "${exportName}", "${filePath}");`
    code += '\n'
  }

  return code
}
