export { isBrowser }

import { assert } from './assert'

function isBrowser() {
  const itIs = __browserTest()
  assert(itIs === !__nodeTest())
  return itIs
}

function __nodeTest() {
  const nodeVersion = typeof process !== 'undefined' && process && process.versions && process.versions.node
  return !!nodeVersion
}

function __browserTest() {
  return typeof window !== 'undefined'
}
