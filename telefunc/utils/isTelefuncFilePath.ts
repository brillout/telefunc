export { isTelefuncFilePath }

import { assertPosixPath } from './filesystemPathHandling'
import { assert } from './assert'

function isTelefuncFilePath(filePath: string): boolean {
  assertPosixPath(filePath)
  return filePath.includes('.telefunc.')
}
