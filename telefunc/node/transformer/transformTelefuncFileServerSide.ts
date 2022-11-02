export { transformTelefuncFileServerSide }

import { getExportNames } from './getExportNames'
import { assertPosixPath } from './utils'
import { generateShield } from '../server/shield/codegen/generateShield'

async function transformTelefuncFileServerSide(
  src: string,
  id: string,
  appRootDir: string,
  skipRegistration: boolean,
  isDev: boolean
) {
  assertPosixPath(id)
  assertPosixPath(appRootDir)

  const exportNames = await getExportNames(src)
  let code = decorateTelefunctions(exportNames, src, id.replace(appRootDir, ''), appRootDir, skipRegistration)

  if (id.endsWith('.ts') && !isDev) {
    code = generateShield(code, id)
  }

  return code
}

function decorateTelefunctions(
  exportNames: readonly string[],
  src: string,
  filePath: string,
  appRootDir: string,
  skipRegistration: boolean
) {
  assertPosixPath(filePath)

  return [
    'import { __decorateTelefunction } from "telefunc";',
    // No break line before `src` to avoid breaking source map lines
    src,
    '\n\n',
    exportNames
      .map(
        (exportName) =>
          `__decorateTelefunction(${exportName}, "${exportName}", "${filePath}", "${appRootDir}", ${String(
            skipRegistration
          )});`
      )
      .join('\n'),
    '\n'
  ].join('')
}
