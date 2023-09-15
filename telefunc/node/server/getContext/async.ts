export { getContext_async }
export { provideTelefuncContext_async }

import { AsyncLocalStorage } from 'async_hooks'
import { assert, assertWarning, isObject, getGlobalObject, assertUsage } from '../../utils'
import { installAsyncMode } from '../getContext'

installAsyncMode({ getContext_async, provideTelefuncContext_async, restoreContext_async })

const globalObject = getGlobalObject<{ asyncStore?: AsyncLocalStorage<Telefunc.Context> }>('getContext/async.ts', {})

function getContext_async(): Telefunc.Context {
  const errMsg = '[getContext()] Make sure to call provideTelefuncContext() before calling getContext()'
  assertUsage(globalObject.asyncStore, errMsg)
  const context = globalObject.asyncStore.getStore()
  assert(context === undefined || isObject(context))
  assertUsage(context, errMsg)
  return context
}

function provideTelefuncContext_async(context: Telefunc.Context): void {
  assertUsage(isObject(context), '[provideTelefuncContext(context)] Argument `context` should be an object')
  globalObject.asyncStore = globalObject.asyncStore ?? new AsyncLocalStorage()
  globalObject.asyncStore.enterWith(context)
}

function restoreContext_async(context: null | Telefunc.Context): any {
  assert(context === null || isObject(context))
  assertWarning(
    !context,
    'When using `provideTelefuncContext()` (i.e. Async Hooks), then providing the `context` object to the server middleware `telefunc()` has no efect.',
    { onlyOnce: true }
  )
}
