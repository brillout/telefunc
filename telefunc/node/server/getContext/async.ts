import { AsyncLocalStorage } from 'async_hooks'
import { assert, isObject, getGlobalObject, assertUsage } from '../../utils'
import { installAsyncMode } from '../getContext'
import { provideErrMsg } from './provideErrMessage'
import type { Telefunc } from './TelefuncNamespace'

export { getContext_async }
export { provideTelefuncContext_async }

const globalObject = getGlobalObject<{ asyncStore?: AsyncLocalStorage<Telefunc.Context> }>('getContext/async.ts', {})

installAsyncMode({ getContext_async, provideTelefuncContext_async, restoreContext_async, getContextOptional_async })

function getContext_async(): Telefunc.Context {
  assert(globalObject.asyncStore)
  const context = globalObject.asyncStore.getStore()
  assert(context === undefined || isObject(context))
  assertUsage(context, provideErrMsg)
  return context
}

function provideTelefuncContext_async(context: Telefunc.Context): void {
  assert(isObject(context))
  globalObject.asyncStore = globalObject.asyncStore || new AsyncLocalStorage()
  globalObject.asyncStore.enterWith(context)
}

function getContextOptional_async(): any {
  assert(false)
}

function restoreContext_async(..._args: any[]): any {
  assert(false)
}
