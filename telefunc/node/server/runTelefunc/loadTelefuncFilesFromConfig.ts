export { loadTelefuncFilesFromConfig }

import { assert, assertPosixPath, assertUsage, dynamicImport, toPosixPath } from '../../utils'
import { posix } from 'path'
import type { TelefuncFiles } from '../types'

async function loadTelefuncFilesFromConfig(telefuncFiles: string[], root: string | null): Promise<TelefuncFiles> {
  assertUsage(root, 'You need to set `telefuncConfig.root`.')
  const telefuncFilesLoaded: TelefuncFiles = {}
  await Promise.all(
    telefuncFiles.map(async (telefuncFilePath) => {
      const path = posix.relative(toPosixPath(root), toPosixPath(telefuncFilePath))
      assertPosixPath(path)
      assertUsage(
        !path.startsWith('../'),
        `The telefunc file \`${telefuncFilePath}\` is not inlcuded in your project root \`${root}\`.`,
      )
      assert(!path.startsWith('/') && !path.startsWith('.'))
      telefuncFilesLoaded['/' + path] = await dynamicImport(telefuncFilePath)
    }),
  )
  return telefuncFilesLoaded
}
