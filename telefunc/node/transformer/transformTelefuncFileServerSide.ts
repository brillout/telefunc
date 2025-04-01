export { transformTelefuncFileServerSide }

import { ExportList, getExportList } from './getExportList.js'
import { assert, assertPosixPath } from './utils.js'
import { generateShield } from './generateShield/generateShield.js'
import { getServerConfig } from '../server/serverConfig.js'

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
    console.log(1)
    console.log(code)
    console.log()
    const codeMod = generateShield(code, id, appRootDir, exportList)
    console.log(2)
    console.log(codeMod)
    console.log()
    const codeNew = moveNewContent(code, codeMod)
    code = codeNew
    console.log(3)
    console.log(code)
    console.log()
  }

  return { code, map: undefined }
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
    // We append everything in order to avoid breaking source map lines for environments that don't support source maps
    src,
    '\n\n',
    'import { __decorateTelefunction } from "telefunc";',
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

function moveNewContent(codeOld: string, codeMod: string) {
  const linesOld = codeOld.split('\n')
  const linesNew: string[] = []
  const linesMod = codeMod.split('\n')
  linesOld.forEach((line) => {
    assert(linesMod.includes(line), { line })
  })
  linesMod.forEach((line) => {
    if (!linesOld.includes(line)) {
      linesNew.push(line)
    }
  })
  const codeNew = (codeOld += '\n\n' + linesNew.join('\n'))
  return codeNew
}
