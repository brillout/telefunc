export { findTelefunction }

import { assert, assertUsage, projectErrorPrefix } from '../../utils'
import type { Telefunction } from '../types'

function findTelefunction(runContext: {
  telefunctionKey: string
  telefuncFilePath: string
  telefuncFilesLoaded: Record<string, Record<string, unknown>>
  telefuncExportName: string
  telefunctions: Record<string, Telefunction>
  logInvalidRequests: boolean
}) {
  const telefunctionsFound = Object.keys(runContext.telefunctions)
  assertUsage(
    telefunctionsFound.length > 0,
    [
      `Telefunction ${runContext.telefuncExportName}() (${runContext.telefuncFilePath}) not found.`,
      "Your app doesn't seem to have any `.telefunc.{js|ts|...}` file."
    ].join(' ')
  )

  const telefunction = runContext.telefunctions[runContext.telefunctionKey]
  if (!telefunction) {
    if (runContext.logInvalidRequests) {
      const errMsg = getNotFoundErrMsg()
      console.error(`${projectErrorPrefix} ${errMsg}`)
    }
    return null
  }

  return telefunction

  function getNotFoundErrMsg() {
    let errMsg = `Telefunction ${runContext.telefuncExportName}() (${runContext.telefuncFilePath}) not found:`
    const { telefuncFilesLoaded, telefuncFilePath, telefuncExportName } = runContext
    const telefuncFile = telefuncFilesLoaded[telefuncFilePath]
    if (!telefuncFile) {
      errMsg += ` the file \`${runContext.telefuncFilePath}\` doesn't seem to exist. Found \`.telefunc.js\` files:`
      const telefuncFilePaths = Object.keys(telefuncFilesLoaded)
      assert(!telefuncFilePaths.includes(telefuncFilePath))
      errMsg += [runContext.telefuncFilePath, ...telefuncFilePaths]
        .sort()
        .map(
          (telefuncFilePath) =>
            `\n  ${telefuncFilePath} ${
              telefuncFilePaths.includes(telefuncFilePath) ? '[✅ Exists]' : "[❌ Doesn't exist]"
            }`
        )
        .join('')
    } else {
      assert(!telefuncFile[telefuncExportName])
      errMsg += ` the file \`${runContext.telefuncFilePath}\` doesn't seem to have an export \`${telefuncExportName}\`. Found telefunctions:`
      assert(!telefuncFilePath.includes(runContext.telefunctionKey))
      errMsg += [runContext.telefunctionKey, ...telefunctionsFound]
        .sort()
        .map(
          (telefunctionKey) =>
            `\n  ${telefunctionKey} ${
              telefunctionsFound.includes(telefunctionKey) ? '[✅ Exists]' : "[❌ Doesn't exist]"
            }`
        )
        .join('')
    }
    return errMsg
  }
}
