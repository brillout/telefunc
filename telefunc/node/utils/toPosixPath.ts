import { win32, posix, sep } from 'path'
import { assert } from './assert'
import { assertPosixPath } from './assertPosixPath'

export { toPosixPath }

function toPosixPath(path: string) {
  if (process.platform !== 'win32') {
    assert(sep === posix.sep)
    assertPosixPath(path)
    return path
  } else {
    assert(sep === win32.sep)
    const pathPosix = path.split(win32.sep).join(posix.sep)
    assertPosixPath(pathPosix)
    return pathPosix
  }
}
