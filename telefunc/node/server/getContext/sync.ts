import { assert, isObject, getGlobalObject, assertUsage } from '../../utils'
import { provideErrMsg } from './provideErrMessage'
import type { Telefunc } from './TelefuncNamespace'

export { getContext_sync }
export { provideTelefuncContext_sync }
export { restoreContext_sync }
export { getContextOptional_sync }

// Using the global scope is needed for Next.js. I'm guessing that Next.js is including the `node_modules/` files in a seperate bundle than user files.
const globalObject = getGlobalObject<{ context: null | Telefunc.Context; isRestored: boolean }>('getContext/sync.ts', {
  context: null,
  isRestored: false
})

function getContext_sync(): Telefunc.Context {
  const { context, isRestored } = globalObject
  assert(context === null || isObject(context))
  const errMsg = isRestored
    ? provideErrMsg
    : '[getContext()] Cannot access context object, see https://telefunc.com/getContext#access'
  assertUsage(context !== null, errMsg)
  return context
}

function getContextOptional_sync() {
  return globalObject.context
}

function restoreContext_sync(context: null | Telefunc.Context) {
  provide(context, true)
}

function provideTelefuncContext_sync(context: Telefunc.Context) {
  provide(context, false)
}

function provide(context: null | Telefunc.Context, isRestored: boolean) {
  assert(context === null || isObject(context))
  if (context) {
    globalObject.context = context
  }
  globalObject.isRestored = isRestored
  process.nextTick(() => {
    globalObject.context = null
    globalObject.isRestored = false
  })
}
