export { getContext }
export { provideTelefuncContext }
export { restoreContext }
export { installAsyncMode }
export { isAsyncMode }
export type { Telefunc }

import { getContext_sync, provideTelefuncContext_sync, restoreContext_sync } from './getContext/sync.js'
import { assert } from '../../utils/assert.js'
import { getGlobalObject } from '../../utils/getGlobalObject.js'
import { isObject } from '../../utils/isObject.js'
import type { Telefunc } from './getContext/TelefuncNamespace.js'

type GetContext = () => Telefunc.Context
type ProvideTelefuncContext = (context: Telefunc.Context) => void
type RestoreContext = (context: null | Telefunc.Context) => void

const globalObject = getGlobalObject<{
  getContext: GetContext
  restoreContext: RestoreContext
  provideTelefuncContext: ProvideTelefuncContext
  isAsyncMode: boolean
}>('getContext.ts', {
  getContext: getContext_sync,
  restoreContext: restoreContext_sync,
  provideTelefuncContext: provideTelefuncContext_sync,
  isAsyncMode: false,
})

function getContext<Context extends object = Telefunc.Context>(): Context {
  const context = globalObject.getContext()
  assert(isObject(context))
  return context as Context
}

function provideTelefuncContext<Context extends object = Telefunc.Context>(context: Context): void {
  /* TO-DO/eventually: check whether it's possible to deprecate Async Hooks for Nuxt.
  assertWarning(false, 'provideTelefuncContext() is deprecated', { onlyOnce: true })
  */
  assert(isObject(context))
  globalObject.provideTelefuncContext(context)
}

function restoreContext(context: null | Telefunc.Context): void {
  assert(context === null || isObject(context))
  globalObject.restoreContext(context)
}

function installAsyncMode({
  getContext_async,
  provideTelefuncContext_async,
  restoreContext_async,
}: {
  getContext_async: GetContext
  provideTelefuncContext_async: ProvideTelefuncContext
  restoreContext_async: RestoreContext
}): void {
  globalObject.getContext = getContext_async
  globalObject.restoreContext = restoreContext_async
  globalObject.provideTelefuncContext = provideTelefuncContext_async
  globalObject.isAsyncMode = true
}
function isAsyncMode(): boolean {
  return globalObject.isAsyncMode
}
