import { assertUsage, assert, isObject } from '../utils'
import { AsyncLocalStorage } from 'async_hooks'

export { getContext_async }
export { getContextOrUndefined_async }
export { provideContext_async }
export { provideContextOrNull_async }

let contextStore: AsyncLocalStorage<Record<string, unknown>>

function getContext_async<T = Record<string, unknown>>(): T {
  assertUsage(contextStore, 'TODO')
  const context = contextStore.getStore()
  assertUsage(context !== undefined, 'TODO')
  assert(isObject(context))
  return context as T
}

function provideContext_async(context: Record<string, unknown>) {
  contextStore = contextStore || new AsyncLocalStorage()
  assertUsage(isObject(context), 'TODO')
  contextStore.enterWith(context)
}

// We don't need this
function provideContextOrNull_async(_context: Record<string, unknown> | null): void {
  return
}
function getContextOrUndefined_async(): Record<string, unknown> | undefined {
  return undefined
}
