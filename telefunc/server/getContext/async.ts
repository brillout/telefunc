import { AsyncLocalStorage } from 'async_hooks'
import { assertUsage, assert, isObject } from '../utils'
import { installAsyncMode } from '../getContext'

export { getContext_async }
export { getContextOrUndefined_async }
export { provideContext_async }
export { provideContextOrNull_async }

let contextStore: AsyncLocalStorage<Record<string, unknown>>

installAsyncMode(getContext_async, getContextOrUndefined_async, provideContext_async, provideContextOrNull_async)

function getContext_async<T = Record<string, unknown>>(): T {
  assertUsage(
    contextStore,
    [
      'You are calling `getContext()` but no context is available.',
      `See ${isNodejs() ? 'https://telefunc.com/ssr' : 'https://telefunc.com/provideContext'}`,
    ].join(' '),
  )
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

function isNodejs(): boolean {
  return typeof process !== 'undefined' && process.release.name === 'node'
}
