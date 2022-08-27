export { getGlobalObject }

import { assert } from './assert'
import { isObject } from './isObject'

function getGlobalObject<T extends Record<string, unknown>>(key: string, defaultValue: T): T {
  assert(key.startsWith('__internal_telefunc'))
  if (typeof global === 'undefined') {
    return defaultValue
  }
  assert(isObject(global))
  return ((global as Record<string, unknown>)[key] = ((global as Record<string, unknown>)[key] as T) || defaultValue)
}
