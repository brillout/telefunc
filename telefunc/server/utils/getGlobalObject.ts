export { getGlobalObject }

// Next.js seem to bundle `telefunc` several times, wich requires us to use `getGlobalObject()` object to ensure that `telefunc` always uses the same global object.

import { assert, isObject } from '.'

function getGlobalObject<T extends Record<string, unknown>>(key: string, defaultValue: T): T {
  assert(key.startsWith('__internal_telefunc'))
  if (typeof global === 'undefined') {
    return defaultValue
  }
  assert(isObject(global))
  return ((global as Record<string, unknown>)[key] = ((global as Record<string, unknown>)[key] as T) || defaultValue)
}
