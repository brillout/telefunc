import { assert, isObject, getGlobalObject } from '../../utils'
import type { Telefunc } from './TelefuncNamespace'

export { getContext_sync }
export { provideTelefuncContext_sync }

// Using the global scope is needed for Next.js. I'm guessing that Next.js is including the `node_modules/` files in a seperate bundle than user files.
const g = getGlobalObject<{ context: null | Telefunc.Context }>('getContext/sync.ts', {
  context: null
})

function getContext_sync(): null | Telefunc.Context {
  assert(g.context === null || isObject(g.context))
  return g.context
}

function provideTelefuncContext_sync(context: Telefunc.Context) {
  assert(isObject(context))
  g.context = context
  process.nextTick(() => {
    g.context = null
  })
}
