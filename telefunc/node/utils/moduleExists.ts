import { isAbsolute, resolve } from 'path'
import { assert, nodeRequire } from '../utils'

export { moduleExists }

function moduleExists(modulePath: string, dir?: string): boolean {
  if (!isAbsolute(modulePath)) {
    assert(dir)
    modulePath = resolve(dir, modulePath)
  }
  assert(isAbsolute(modulePath))

  try {
    nodeRequire.resolve(modulePath)
    return true
  } catch (err) {
    return false
  }
}
