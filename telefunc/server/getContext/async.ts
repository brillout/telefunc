import { AsyncLocalStorage } from 'async_hooks'
import { assert, isObject } from '../utils'
import { installAsyncMode } from '../getContext'

export { getContext_async }
export { provideContext_async }

let _asyncStore: AsyncLocalStorage<Record<string, unknown>>

installAsyncMode({ getContext_async, provideContext_async })

function getContext_async(): Record<string, unknown> | undefined {
  const context = _asyncStore.getStore()
  assert(context === undefined || isObject(context))
  return context
}

function provideContext_async(context: Record<string, unknown>) {
  assert(isObject(context))
  _asyncStore = _asyncStore || new AsyncLocalStorage()
  _asyncStore.enterWith(context)
}
