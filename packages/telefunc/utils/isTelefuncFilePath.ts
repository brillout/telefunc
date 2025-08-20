export { isTelefuncFilePath }

import { assertPosixPath } from './path.js'

function isTelefuncFilePath(filePath: string): boolean {
  assertPosixPath(filePath)
  return filePath.includes('.telefunc.')
}
