import { assert, isObject } from '../utils'

export { getContext_sync }
export { provideContext_sync }

let _context: undefined | Record<string, unknown> = undefined

function getContext_sync(): undefined | Record<string, unknown> {
  assert(_context === undefined || isObject(_context))
  return _context
}

function provideContext_sync(context: Record<string, unknown>) {
  assert(isObject(context))
  _context = context
  process.nextTick(() => {
    _context = undefined
  })
}
