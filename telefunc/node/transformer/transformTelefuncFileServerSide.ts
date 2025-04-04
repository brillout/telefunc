export { transformTelefuncFileServerSide }

import { ExportList, getExportList } from './getExportList.js'
import { assertPosixPath, isNotNullish } from './utils.js'
import { generateShield } from './generateShield/generateShield.js'
import { getServerConfig } from '../server/serverConfig.js'
import MagicString from 'magic-string'

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
  const codeDecoration = decorateTelefunctions(exportList, id.replace(appRootDir, ''), appRootDir, skipRegistration)

  let codeShield: string | undefined
  const config = getServerConfig()
  if (id.endsWith('.ts') && (!isDev || config.shield.dev)) {
    codeShield = generateShield(src, id, appRootDir, exportList)
  }

  const s = new MagicString(src)
  // We append everything in order to avoid breaking source map lines for environments that don't support source maps
  s.append(['', codeDecoration, codeShield].filter(isNotNullish).join('\n\n'))
  const code = s.toString()
  const map = s.generateMap({ hires: true, source: id })
  return { code, map }
}

function decorateTelefunctions(
  exportList: ExportList,
  filePath: string,
  appRootDir: string,
  skipRegistration: boolean,
) {
  assertPosixPath(filePath)

  return [
    'import { __decorateTelefunction } from "telefunc";',
    ...exportList.map(
      ({ exportName, localName }) =>
        `__decorateTelefunction(${localName || exportName}, "${exportName}", "${filePath}", "${appRootDir}", ${String(
          skipRegistration,
        )});`,
    ),
  ].join('\n')
}
