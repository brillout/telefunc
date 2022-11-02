export { assertTelefuncFilePath }

import { assertPosixPath } from './filesystemPathHandling'
import { assert } from './assert'

function assertTelefuncFilePath(filePath: string) {
  assertPosixPath(filePath)
  assert(filePath.startsWith('/'))
  assert(filePath.includes('.telefunc.'))
}
