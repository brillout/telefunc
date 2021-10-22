import { assertUsage, assert, isObject } from './utils'

export { getContext }
export { setContext }
export { resetContext }

let _context: null | Record<string, unknown> = null
let _isSSR: null | boolean = null

function getContext<T = Record<string, any>>(): T {
  const wrongUsageError = _isSSR
    ? 'You are using Telfunc with SSR. Make sure to enable SSR: `createTelefuncCaller({ enableSSR: true })`.'
    : 'Make sure to call `getContext()` before using any `await` operations. You can first `const context = getContext()` and then access `context` after `await` operations.'
  assertUsage(_context !== null, wrongUsageError)
  return _context as T
}

function setContext(context: Record<string, unknown>, isSSR: boolean) {
  assert(_context === null)
  assert(_isSSR === null)
  assert(isObject(context))
  _context = context
  _isSSR = isSSR
  process.nextTick(() => {
    // `resetContext()` should have been called by now
    assert(_context === null)
    assert(_isSSR === null)
  })
}

function resetContext() {
  _context = null
  _isSSR = null
}
