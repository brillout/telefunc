export { getContext }
export { getContextOptional }
export { provideTelefuncContext }
export { Telefunc }
export { installAsyncMode }

import { getContext_sync, provideTelefuncContext_sync } from './getContext/sync'
import { assert, assertUsage, isObject, getGlobalObject } from '../utils'
import type { Telefunc } from './getContext/TelefuncNamespace'

type GetContext = () => Telefunc.Context | null
type ProvideTelefuncContext = (context: Telefunc.Context) => void

const globalObject = getGlobalObject<{
  getContext: GetContext
  provideTelefuncContext: ProvideTelefuncContext
  neverProvided: boolean
}>('getContext.ts', {
  getContext: getContext_sync,
  provideTelefuncContext: provideTelefuncContext_sync,
  neverProvided: true
})

function getContext<Context extends object = Telefunc.Context>(): Context {
  const context = globalObject.getContext()
  assertUsage(
    globalObject.neverProvided === false,
    '[getContext()] Make sure to provide a context object before using getContext(), see https://telefunc.com/getContext#provide'
  )
  assertUsage(context !== null, '[getContext()] No context object found, see https://telefunc.com/getContext#not-found')
  assert(isObject(context))
  return context as Context
}

function getContextOptional() {
  const context = globalObject.getContext()
  return context
}

function provideTelefuncContext<Context extends object = Telefunc.Context>(context: Context) {
  globalObject.neverProvided = false
  globalObject.provideTelefuncContext(context)
}

async function installAsyncMode({
  getContext_async,
  provideTelefuncContext_async
}: {
  getContext_async: GetContext
  provideTelefuncContext_async: ProvideTelefuncContext
}) {
  globalObject.getContext = getContext_async
  globalObject.provideTelefuncContext = provideTelefuncContext_async
}
