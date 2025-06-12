export { isTelefuncFilePath }

import { assertPosixPath } from './toPosixPath.js'

function isTelefuncFilePath(filePath: string): boolean {
  assertPosixPath(filePath)
  return filePath.includes('.telefunc.')
}
