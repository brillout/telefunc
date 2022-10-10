export { getContext }
export { getContextOptional }
export { provideTelefuncContext }
export { Telefunc }
export { installAsyncMode }
export { isAsyncMode }
export { restoreContext }

import {
  getContext_sync,
  provideTelefuncContext_sync,
  restoreContext_sync,
  getContextOptional_sync
} from './getContext/sync'
import { assert, assertUsage, isObject, getGlobalObject } from '../utils'
import type { Telefunc } from './getContext/TelefuncNamespace'
import { provideErrMsg } from './getContext/provideErrMessage'

type GetContext = () => Telefunc.Context
type ProvideTelefuncContext = (context: Telefunc.Context) => void
type RestoreContext = (context: null | Telefunc.Context) => void
type GetContextOptional = () => null | Telefunc.Context

const globalObject = getGlobalObject<{
  getContext: GetContext
  provideTelefuncContext: ProvideTelefuncContext
  restoreContext: RestoreContext
  neverProvided: boolean
  isAsyncMode: boolean
  getContextOptional: GetContextOptional
}>('getContext.ts', {
  getContext: getContext_sync,
  provideTelefuncContext: provideTelefuncContext_sync,
  restoreContext: restoreContext_sync,
  getContextOptional: getContextOptional_sync,
  isAsyncMode: false,
  neverProvided: true
})

function getContext<Context extends object = Telefunc.Context>(): Context {
  assertUsage(globalObject.neverProvided === false, provideErrMsg)
  const context = globalObject.getContext()
  assert(isObject(context))
  return context as Context
}

function getContextOptional() {
  const context = globalObject.getContextOptional()
  return context
}

function provideTelefuncContext<Context extends object = Telefunc.Context>(context: Context) {
  globalObject.neverProvided = false
  globalObject.provideTelefuncContext(context)
}

function restoreContext(context: null | Telefunc.Context) {
  globalObject.neverProvided = false
  return globalObject.restoreContext(context)
}

function installAsyncMode({
  getContext_async,
  provideTelefuncContext_async,
  restoreContext_async,
  getContextOptional_async
}: {
  getContext_async: GetContext
  provideTelefuncContext_async: ProvideTelefuncContext
  restoreContext_async: RestoreContext
  getContextOptional_async: GetContextOptional
}): void {
  globalObject.getContext = getContext_async
  globalObject.provideTelefuncContext = provideTelefuncContext_async
  globalObject.restoreContext = restoreContext_async
  globalObject.getContextOptional = getContextOptional_async
  globalObject.isAsyncMode = true
}
function isAsyncMode(): boolean {
  return globalObject.isAsyncMode
}
