export { transformTelefuncFileSync }

import { posix } from 'path'
import { assert } from '../utils'
import { assertPosixPath } from '../utils/assertPosixPath'
import { getCode } from './getCode'

function transformTelefuncFileSync(id: string, root: string, exportNames: string[]) {
  assertPosixPath(id)
  assertPosixPath(root)

  const telefuncFilePath = '/' + posix.relative(root, id)
  assert(!telefuncFilePath.startsWith('/.'))
  assertPosixPath(telefuncFilePath)

  return {
    code: getCode(exportNames, telefuncFilePath),
    map: null,
  }
}

