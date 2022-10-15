export { moduleExists }

import { isAbsolute, resolve } from 'path'
import { assert } from './assert'

function moduleExists(modulePath: string, dirPath?: string): boolean {
  if (!isAbsolute(modulePath)) {
    assert(dirPath)
    assert(isAbsolute(dirPath))
    modulePath = resolve(dirPath, modulePath)
  }
  assert(isAbsolute(modulePath))

  // Avoid bundlers to try to statically analyze the dependency.
  // `const req = require` not sufficient for webpack
  const req = 1 < 2 ? require : (3 as never)

  try {
    req.resolve(modulePath)
    return true
  } catch {
    return false
  }
}
