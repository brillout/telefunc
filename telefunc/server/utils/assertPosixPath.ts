import { win32 } from 'path'
import { assert } from '../../shared/utils'

export { assertPosixPath }

function assertPosixPath(path: string) {
  const errMsg = `Wrongly formatted path: ${path}`
  assert(!path.includes(win32.sep), errMsg)
  // assert(path.startsWith('/'), errMsg)
}
