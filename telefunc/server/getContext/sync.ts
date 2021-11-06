import { assertUsage, assert, isObject } from '../utils'

export { getContext_sync }
export { getContextOrUndefined_sync }
export { provideContext_sync }
export { provideContextOrNull_sync }

let _context: undefined | null | Record<string, unknown> = undefined

function getContext_sync<T = Record<string, unknown>>(): T {
  /*
  const wrongUsageError = _isSSR
    ? 'You are using Telfunc with SSR. Make sure to enable SSR: `createTelefuncCaller({ enableSSR: true })`.'
    : 'Make sure to call `getContext()` before using any `await` operations. You can first `const context = getContext()` and then access `context` after `await` operations.'
    */
  assertUsage(_context !== undefined, 'TODO')
  assertUsage(_context !== null, 'TODO')
  return _context as T
}

function getContextOrUndefined_sync(): Record<string, unknown> | undefined {
  assert(_context !== null)
  return _context
}

function provideContext_sync(context: Record<string, unknown>) {
  assertUsage(isObject(context), 'TODO')
  _context = context
  process.nextTick(() => {
    _context = undefined
  })
}

function provideContextOrNull_sync(context: Record<string, unknown> | null) {
  if (context === null) {
    return
  }
  provideContext_sync(context)
}
