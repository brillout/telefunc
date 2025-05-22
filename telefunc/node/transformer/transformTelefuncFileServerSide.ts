export { transformTelefuncFileServerSide }

import { ExportList, getExportList } from './getExportList.js'
import { assertPosixPath, isNotNullish } from './utils.js'
import { generateShield } from './generateShield/generateShield.js'
import { getServerConfig } from '../server/serverConfig.js'
import MagicString from 'magic-string'

async function transformTelefuncFileServerSide(src: string, id: string, appRootDir: string, isDev: boolean) {
  assertPosixPath(id)
  assertPosixPath(appRootDir)

  const exportList = await getExportList(src)
  const codeDecoration = decorateTelefunctions(exportList, id.replace(appRootDir, ''), appRootDir)

  let codeShield: string | undefined
  const config = getServerConfig()
  const isShieldEnabled = isDev ? config.shield.dev : config.shield.prod
  if (id.endsWith('.ts') && isShieldEnabled) {
    codeShield = generateShield(src, id, appRootDir, exportList)
  }

  const magicString = new MagicString(src)
  // We append everything in order to avoid breaking source map lines for environments that don't support source maps
  magicString.append(['', codeDecoration, codeShield].filter(isNotNullish).join('\n\n'))
  const code = magicString.toString()
  const map = magicString.generateMap({ hires: true, source: id })
  return { code, map }
}

function decorateTelefunctions(exportList: ExportList, filePath: string, appRootDir: string) {
  assertPosixPath(filePath)

  return [
    'import { __decorateTelefunction } from "telefunc";',
    ...exportList.map(
      ({ exportName, localName }) =>
        `__decorateTelefunction(${localName || exportName}, "${exportName}", "${filePath}", "${appRootDir}");`,
    ),
  ].join('\n')
}
