import { getContext_sync, provideContext_sync } from './getContext/sync'
import { assert, assertUsage, isObject } from './utils'

export { getContext }
export { getContextOptional }
export { provideContext }

export { installAsyncMode }
installSyncMode()

type Context = Record<string, unknown>

function getContext() {
  const context = _getContext()
  assertUsage(
    context !== undefined,
    [
      'You are calling `getContext()` but no context is available.',
      `See ${isNodejs() ? 'https://telefunc.com/ssr' : 'https://telefunc.com/provideContext'}`,
    ].join(' '),
  )
  assert(isObject(context))
  return context
}

function getContextOptional() {
  const context = _getContext()
  return context
}

function provideContext(context: Record<string, unknown>) {
  _provideContext(context)
}

var _getContext: () => Context | undefined
var _provideContext: (context: Context) => void

function installSyncMode() {
  _getContext = getContext_sync
  _provideContext = provideContext_sync
}
async function installAsyncMode({
  getContext_async,
  provideContext_async,
}: {
  getContext_async: typeof _getContext
  provideContext_async: typeof _provideContext
}) {
  _getContext = getContext_async
  _provideContext = provideContext_async
}

function isNodejs(): boolean {
  return typeof process !== 'undefined' && process.release.name === 'node'
}
