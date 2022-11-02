export { isTelefuncFilePath }

import { assertPosixPath } from './filesystemPathHandling'
import { assert } from './assert'

function isTelefuncFilePath(filePath: string): boolean {
  assertPosixPath(filePath)
  assert(filePath.startsWith('/'))
  return filePath.includes('.telefunc.')
}
