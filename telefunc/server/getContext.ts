import { getContext_sync, provideContext_sync } from './getContext/sync'
import { assert, assertUsage, isObject } from './utils'
import type { Telefunc } from './getContext/TelefuncNamespace'

export { getContext }
export { getContextOptional }
export { provideContext }
export { Telefunc }

export { installAsyncMode }
installSyncMode()

function getContext<Context extends object = Telefunc.Context>(): Context {
  const context = _getContext()
  assertUsage(
    context !== undefined,
    [
      `You are calling \`getContext()\` but no context is available${!isSSR() ? '' : ' (SSR)'}.`,
      'Make sure to properly call `provideContext()`,',
      `see https://telefunc.com/provideContext${isSSR() ? '#ssr' : ''}`,
    ].join(' '),
  )
  assert(isObject(context))
  return context as Context
}

function getContextOptional() {
  const context = _getContext()
  return context
}

function provideContext<Context extends object = Telefunc.Context>(context: Context) {
  _provideContext(context)
}

var _getContext: () => Telefunc.Context | undefined
var _provideContext: (context: Telefunc.Context) => void

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

function isSSR(): boolean {
  // TODO
  return false
}
