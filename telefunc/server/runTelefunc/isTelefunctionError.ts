export { isTelefunctionError }
export { markTelefunctionError }

import { assert, isObject } from '../utils'

const isTelefunctionErrorSymbol = Symbol('isTelefunctionErrorSymbol')

function isTelefunctionError(err: unknown) {
  if (!isObject(err)) {
    return false
  }
  return err[isTelefunctionErrorSymbol] === true
}

function markTelefunctionError(err: unknown) {
  assert(isObject(err))
  err[isTelefunctionErrorSymbol] = true
}
