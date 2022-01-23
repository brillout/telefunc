import { isAbsolute, resolve } from 'path'
import { assert, nodeRequire } from '../utils'

export { moduleExists }

function moduleExists(modulePath: string, __dirname?: string): boolean {
  if (!isAbsolute(modulePath)) {
    assert(__dirname)
    modulePath = resolve(__dirname, modulePath)
  }
  assert(isAbsolute(modulePath))

  try {
    nodeRequire.resolve(modulePath)
    return true
  } catch (err) {
    return false
  }
}
