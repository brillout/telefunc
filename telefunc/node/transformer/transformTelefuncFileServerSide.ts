export { transformTelefuncFileServerSide }

import { ExportList, getExportList } from './getExportList'
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

  const exportList = await getExportList(src)
  let code = decorateTelefunctions(exportList, src, id.replace(appRootDir, ''), appRootDir, skipRegistration)

  const config = getServerConfig()
  if (id.endsWith('.ts') && (!isDev || config.shield.dev)) {
    code = generateShield(code, id, appRootDir, exportList)
  }

  return code
}

function decorateTelefunctions(
  exportList: ExportList,
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
    exportList
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
