import { win32, posix, sep } from 'path'
import { assert } from './assert'
import { assertPosixPath } from './assertPosixPath'

export { toPosixPath }
export { toSystemPath }

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

function toSystemPath(path: string) {
  path = path.split(posix.sep).join(sep)
  path = path.split(win32.sep).join(sep)
  return path
}
