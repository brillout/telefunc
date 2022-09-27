export { transformTelefuncFileSSR }

import { getExportNames } from './getExportNames'
import { assertPosixPath, getTelefunctionKey } from './utils'

async function transformTelefuncFileSSR(src: string, id: string, root: string, skipAddTelefunction?: true) {
  assertPosixPath(id)
  assertPosixPath(root)

  const exportNames = await getExportNames(src)

  return {
    code: getCode(exportNames, src, id.replace(root, ''), skipAddTelefunction),
    map: null
  }
}

function getCode(exportNames: readonly string[], src: string, filePath: string, skipAddTelefunction?: boolean) {
  assertPosixPath(filePath)

  let code = src

  if (!skipAddTelefunction) {
    const telefuncImport = 'import { __internal_addTelefunction } from "telefunc";'
    // No break line between `telefuncImport` and `src` in order to preserve the source map's line mapping
    code = telefuncImport + src
  }

  const extraLines: string[] = []

  code += '\n\n'
  for (const exportName of exportNames) {
    if (!skipAddTelefunction) {
      extraLines.push(`__internal_addTelefunction(${exportName}, "${exportName}", "${filePath}");`)
    }
    {
      const telefunctionKey = getTelefunctionKey(filePath, exportName)
      extraLines.push(`${exportName}['_key'] = ${JSON.stringify(telefunctionKey)};`)
    }
  }

  code += '\n' + extraLines.join('\n')

  return code
}
