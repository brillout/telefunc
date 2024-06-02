export { assert }
export { assertUsage }
export { assertWarning }
export { assertInfo }
export { getProjectError }
export { errorPrefix }

import { createErrorWithCleanStackTrace } from './createErrorWithCleanStackTrace'
import { getGlobalObject } from './getGlobalObject'
import { projectInfo } from './projectInfo'

const errorPrefix = `[${projectInfo.npmPackageName}@${projectInfo.projectVersion}]`
const internalErrorPrefix = `${errorPrefix}[Bug]`
const usageErrorPrefix = `${errorPrefix}[Wrong Usage]`
const warningPrefix = `${errorPrefix}[Warning]`
const infoPrefix = `${errorPrefix}[Info]`

const numberOfStackTraceLinesToRemove = 2

function assert(condition: unknown, debugInfo?: unknown): asserts condition {
  if (condition) {
    return
  }

  const debugStr = (() => {
    if (!debugInfo) {
      return ''
    }
    const debugInfoSerialized = typeof debugInfo === 'string' ? debugInfo : '`' + JSON.stringify(debugInfo) + '`'
    return `Debug info (this is for the ${projectInfo.projectName} maintainers; you can ignore this): ${debugInfoSerialized}.`
  })()

  const link = 'https://github.com/brillout/telefunc/issues/new'
  const internalError = createErrorWithCleanStackTrace(
    [
      internalErrorPrefix,
      `You stumbled upon a Telefunc bug. Go to ${link} and copy-paste this error. A maintainer will fix the bug (usually under 24 hours).`,
      debugStr,
    ].join(' '),
    numberOfStackTraceLinesToRemove,
  )

  throw internalError
}

function assertUsage(condition: unknown, errorMessage: string): asserts condition {
  if (condition) {
    return
  }
  const whiteSpace = errorMessage.startsWith('[') ? '' : ' '
  const usageError = createErrorWithCleanStackTrace(
    `${usageErrorPrefix}${whiteSpace}${errorMessage}`,
    numberOfStackTraceLinesToRemove,
  )
  throw usageError
}

function getProjectError(errorMessage: string) {
  const sep = errorMessage.startsWith('[') ? '' : ' '
  const pluginError = createErrorWithCleanStackTrace(
    `${errorPrefix}${sep}${errorMessage}`,
    numberOfStackTraceLinesToRemove,
  )
  return pluginError
}

const globalObject = getGlobalObject<{ alreadyLogged: Set<string> }>('assert.ts', { alreadyLogged: new Set() })
function assertWarning(
  condition: unknown,
  errorMessage: string,
  { onlyOnce, showStackTrace }: { onlyOnce: boolean | string; showStackTrace?: true },
): void {
  if (condition) {
    return
  }
  const msg = `${warningPrefix} ${errorMessage}`
  if (onlyOnce) {
    const { alreadyLogged } = globalObject
    const key = onlyOnce === true ? msg : onlyOnce
    if (alreadyLogged.has(key)) {
      return
    } else {
      alreadyLogged.add(key)
    }
  }
  if (showStackTrace) {
    console.warn(new Error(msg))
  } else {
    console.warn(msg)
  }
}

function assertInfo(condition: unknown, errorMessage: string, { onlyOnce }: { onlyOnce: boolean }): void {
  if (condition) {
    return
  }
  const msg = `${infoPrefix} ${errorMessage}`
  if (onlyOnce) {
    const { alreadyLogged } = globalObject
    const key = msg
    if (alreadyLogged.has(key)) {
      return
    } else {
      alreadyLogged.add(key)
    }
  }
  console.log(msg)
}
