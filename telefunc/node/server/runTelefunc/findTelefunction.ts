export { findTelefunction }

import { assert, assertUsage, getPluginError } from '../../utils'
import type { Telefunction } from '../types'

function findTelefunction(runContext: {
  telefunctionKey: string
  telefunctionName: string
  telefunctionFilePath: string
  telefuncFiles: Record<string, Record<string, unknown>>
  telefunctionFileExport: string
  telefunctions: Record<string, Telefunction>
  isProduction: boolean
}) {
  const telefunctionsFound = Object.keys(runContext.telefunctions)
  assertUsage(
    telefunctionsFound.length > 0,
    [
      `Telefunction ${runContext.telefunctionName} not found.`,
      "Your app doesn't seem to have any `.telefunc.{js|ts|...}` file.",
    ].join(' '),
  )

  const telefunction = runContext.telefunctions[runContext.telefunctionKey]
  if (!telefunction) {
    if (!runContext.isProduction) {
      const errMsg = getNotFoundErrMsg()
      console.error(getPluginError(errMsg))
    }
    return null
  }

  return telefunction

  function getNotFoundErrMsg() {
    let errMsg = `Telefunction ${runContext.telefunctionName} not found.`
    const { telefuncFiles, telefunctionFilePath, telefunctionFileExport } = runContext
    const telefuncFile = telefuncFiles[telefunctionFilePath]
    if (!telefuncFile) {
      errMsg += ` The file \`${runContext.telefunctionFilePath}\` doesn't seem to exist.`
    } else {
      assert(!telefuncFile[telefunctionFileExport])
      errMsg += ` The file \`${runContext.telefunctionFilePath}\` doesn't seem to have an export \`${telefunctionFileExport}\`.`
    }
    errMsg += [runContext.telefunctionKey, ...telefunctionsFound]
      .sort()
      .map(
        (telefunctionKey) =>
          `\n${telefunctionKey} ${telefunctionsFound.includes(telefunctionKey) ? '[✅ Found]' : '[❌ Not Found]'}`,
      )
      .join('')
    return errMsg
  }
}
