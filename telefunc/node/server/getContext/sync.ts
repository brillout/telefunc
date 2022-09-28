import { assert, isObject, getGlobalObject } from '../../utils'
import type { Telefunc } from './TelefuncNamespace'

export { getContext_sync }
export { provideTelefuncContext_sync }

// Using the global scope is needed for Next.js. I'm guessing that Next.js is including the `node_modules/` files in a seperate bundle than user files.
const globalObject = getGlobalObject<{ context: null | Telefunc.Context }>('getContext/sync.ts', {
  context: null
})

function getContext_sync(): null | Telefunc.Context {
  const { context } = globalObject
  assert(context === null || isObject(context))
  return context
}

function provideTelefuncContext_sync(context: Telefunc.Context) {
  assert(isObject(context))
  globalObject.context = context
  process.nextTick(() => {
    globalObject.context = null
  })
}
