export { transformTelefuncFileServerSide }

import { ExportNames, getExportNames } from './getExportNames'
import { assertPosixPath } from './utils'
import { generateShield } from '../server/shield/codegen/generateShield'
import { getServerConfig } from '../server/serverConfig'

async function transformTelefuncFileServerSide(
  src: string,
  id: string,
  appRootDir: string,
  skipRegistration: boolean,
  isDev: boolean,
) {
  assertPosixPath(id)
  assertPosixPath(appRootDir)

  const exportNames = await getExportNames(src)
  let code = decorateTelefunctions(exportNames, src, id.replace(appRootDir, ''), appRootDir, skipRegistration)

  const config = getServerConfig()
  if (id.endsWith('.ts') && (!isDev || config.shield.dev)) {
    code = generateShield(code, id, appRootDir)
  }

  return code
}

function decorateTelefunctions(
  exportNames: ExportNames,
  src: string,
  filePath: string,
  appRootDir: string,
  skipRegistration: boolean,
) {
  assertPosixPath(filePath)

  return [
    'import { __decorateTelefunction } from "telefunc";',
    // No break line before `src` to avoid breaking source map lines
    src,
    '\n\n',
    exportNames
      .map(
        ({ exportName, localName }) =>
          `__decorateTelefunction(${localName || exportName}, "${exportName}", "${filePath}", "${appRootDir}", ${String(
            skipRegistration,
          )});`,
      )
      .join('\n'),
    '\n',
  ].join('')
}
