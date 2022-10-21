export { transformTelefuncFileServerSide }

import { getExportNames } from './getExportNames'
import { assertPosixPath, getTelefunctionKey } from './utils'

async function transformTelefuncFileServerSide(src: string, id: string, root: string, skipRegistration?: true) {
  assertPosixPath(id)
  assertPosixPath(root)

  const exportNames = await getExportNames(src)

  const code = registerAndAssertTelefunctions(exportNames, src, id.replace(root, ''), skipRegistration)

  return code
}

function registerAndAssertTelefunctions(exportNames: readonly string[], src: string, filePath: string, skipRegistration?: boolean) {
  assertPosixPath(filePath)

  const codePreprend = (() => {
    if (!skipRegistration) {
      // `__registerTelefunction()` includes `__assertTelefuncFileExport()`
      return 'import { __registerTelefunction } from "telefunc";'
    } else {
      return 'import { __assertTelefuncFileExport } from "telefunc";'
    }
  })()

  const codeAppend = (() => {
    const lines: string[] = []

    for (const exportName of exportNames) {
      if (!skipRegistration) {
        lines.push(`__registerTelefunction(${exportName}, "${exportName}", "${filePath}");`)
      } else {
        lines.push(`__assertTelefuncFileExport(${exportName}, "${exportName}", "${filePath}");`)
      }
      {
        const telefunctionKey = getTelefunctionKey(filePath, exportName)
        lines.push(`${exportName}['_key'] = ${JSON.stringify(telefunctionKey)};`)
      }
    }

    return lines.join('\n')
  })()


  // No break line between `codePreprend` and `src` in order to preserve the source map's line mapping
  const code = `${codePreprend}${src}\n\n${codeAppend}\n`
  return code
}
