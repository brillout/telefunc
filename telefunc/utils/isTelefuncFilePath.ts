export { isTelefuncFilePath }

import { assert } from './assert'
import { assertPosixPath } from './filesystemPathHandling'

function isTelefuncFilePath(filePath: string): boolean {
  assertPosixPath(filePath)
  return filePath.includes('.telefunc.')
}
