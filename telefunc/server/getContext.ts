import { assertUsage, assert, isObject } from './utils'

export { getContext }
export { getContextOrUndefined }
export { provideContext }
export { provideContextOrNull }

let _context: undefined | null | Record<string, unknown> = undefined

function getContext<T = Record<string, any>>(): T {
  /*
  const wrongUsageError = _isSSR
    ? 'You are using Telfunc with SSR. Make sure to enable SSR: `createTelefuncCaller({ enableSSR: true })`.'
    : 'Make sure to call `getContext()` before using any `await` operations. You can first `const context = getContext()` and then access `context` after `await` operations.'
    */
  assertUsage(_context !== undefined, "TODO")
  assertUsage(_context !== null, "TODO")
  return _context as T
}

function getContextOrUndefined(): Record<string, unknown> | undefined {
  assert(_context !== null)
  return _context
}

function provideContext(context: Record<string, unknown>) {
  assertUsage(isObject(context), "TODO")
  _context = context
  process.nextTick(() => {
    _context = undefined
  })
}

function provideContextOrNull(context: Record<string, unknown> | null) {
  if( context === null ) {
    return
  }
  provideContext(context)
}
