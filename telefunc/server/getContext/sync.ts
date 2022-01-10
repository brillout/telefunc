import { assert, isObject } from '../utils'
import type { Telefunc } from './TelefuncNamespace'

export { getContext_sync }
export { provideContext_sync }

let _context: undefined | Telefunc.Context = undefined

function getContext_sync(): undefined | Telefunc.Context {
  assert(_context === undefined || isObject(_context))
  return _context
}

function provideContext_sync(context: Telefunc.Context) {
  assert(isObject(context))
  _context = context
  process.nextTick(() => {
    _context = undefined
  })
}
