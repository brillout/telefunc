export { isTelefuncFilePath }

import { assertPosixPath } from './filesystemPathHandling'

function isTelefuncFilePath(filePath: string): boolean {
  assertPosixPath(filePath)
  return filePath.includes('.telefunc.')
}
