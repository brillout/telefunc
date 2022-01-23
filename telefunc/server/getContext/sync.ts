import { assert, isObject, getGlobalObject } from '../utils'
import type { Telefunc } from './TelefuncNamespace'

export { getContext_sync }
export { provideContext_sync }

const g = getGlobalObject<{ context: undefined | Telefunc.Context }>('__internal_telefuncContext', {
  context: undefined,
})

function getContext_sync(): undefined | Telefunc.Context {
  assert(g.context === undefined || isObject(g.context))
  return g.context
}

function provideContext_sync(context: Telefunc.Context) {
  assert(isObject(context))
  g.context = context
  process.nextTick(() => {
    g.context = undefined
  })
}
