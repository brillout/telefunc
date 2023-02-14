export { isWebpack }

import { assert } from './assert'

function isWebpack(): boolean {
  const test1 = typeof __non_webpack_require__ === 'function'
  const test2 = typeof __webpack_require__ === 'function'
  assert(test1 === test2)
  return test1 || test2
}

declare global {
  var __non_webpack_require__: undefined | unknown
  var __webpack_require__: undefined | unknown
}
