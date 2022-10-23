export { findTelefunction }

import { assert, assertUsage, projectErrorPrefix } from '../../utils'
import type { TelefuncFiles, Telefunction } from '../types'
import { assertTelefunction } from './assertTelefunction'

function findTelefunction(runContext: {
  telefuncFilePath: string
  telefuncFilesLoaded: TelefuncFiles
  telefuncFilesAll: string[]
  telefunctionName: string
  logInvalidRequests: boolean
}): null | Telefunction {
  assertUsage(
    runContext.telefuncFilesAll.length > 0,
    [
      `Telefunction ${runContext.telefunctionName}() (${runContext.telefuncFilePath}) not found.`,
      "Your app doesn't seem to have any `.telefunc.{js|ts|...}` file."
    ].join(' ')
  )

  const telefuncFile = findTelefuncFile(runContext)
  const telefunction = (() => {
    if (!telefuncFile) {
      return null
    }
    if (!(runContext.telefunctionName in telefuncFile.fileExports)) {
      return null
    }
    const telefunction = telefuncFile.fileExports[runContext.telefunctionName]
    assertTelefunction(telefunction, runContext.telefunctionName, telefuncFile.filePath)
    return telefunction
  })()

  if (!telefunction) {
    if (runContext.logInvalidRequests) {
      const errMsg = getNotFoundErrMsg()
      console.error(`${projectErrorPrefix} ${errMsg}`)
    }
    return null
  }

  return telefunction

  function getNotFoundErrMsg() {
    let errMsg = `Telefunction ${runContext.telefunctionName}() (${runContext.telefuncFilePath}) not found:`
    if (!telefuncFile) {
      errMsg += ` the file \`${runContext.telefuncFilePath}\` doesn't seem to exist. Found \`.telefunc.js\` files:`
      assert(!runContext.telefuncFilesAll.includes(runContext.telefuncFilePath))
      errMsg += [runContext.telefuncFilePath, ...runContext.telefuncFilesAll]
        .sort()
        .map(
          (filePath) =>
            `\n  ${filePath} ${runContext.telefuncFilesAll.includes(filePath) ? '[✅ Exists]' : "[❌ Doesn't exist]"}`
        )
        .join('')
    } else {
      assert(!telefuncFile.fileExports[runContext.telefunctionName])
      errMsg += ` the file \`${runContext.telefuncFilePath}\` doesn't seem to have an export a telefunction \`${runContext.telefunctionName}\`. Found telefunctions:`
      const telefuncFileExportNames = Object.keys(telefuncFile.fileExports)
      assert(!telefuncFileExportNames.includes(runContext.telefunctionName))
      errMsg += [runContext.telefunctionName, ...telefuncFileExportNames]
        .sort()
        .map(
          (exportName) =>
            `\n  export { ${exportName} } in ${telefuncFile.filePath} ${
              telefuncFileExportNames.includes(exportName) ? '[✅ Exists]' : "[❌ Doesn't exist]"
            }`
        )
        .join('')
    }
    return errMsg
  }
}

function findTelefuncFile(runContext: {
  telefuncFilesLoaded: TelefuncFiles
  telefuncFilePath: string
  telefuncFilesAll: string[]
}) {
  const found = Object.entries(runContext.telefuncFilesLoaded).filter(([telefuncFilePath]) => {
    assert(runContext.telefuncFilesAll.includes(telefuncFilePath))
    return telefuncFilePath === runContext.telefuncFilePath
  })
  if (found.length === 0) {
    assert(!runContext.telefuncFilesAll.includes(runContext.telefuncFilePath))
    return null
  }
  assert(found.length === 1)
  const [filePath, fileExports] = found[0]!
  const telefuncFileFound = { filePath, fileExports }
  return telefuncFileFound
}
