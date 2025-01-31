export { isTelefuncFilePath }

import { assertPosixPath } from './toPosixPath'

function isTelefuncFilePath(filePath: string): boolean {
  assertPosixPath(filePath)
  return filePath.includes('.telefunc.')
}
