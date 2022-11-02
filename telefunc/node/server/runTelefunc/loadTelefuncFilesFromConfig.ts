export { loadTelefuncFilesFromConfig }

import { assert, assertPosixPath, assertUsage, dynamicImport, toPosixPath } from '../../utils'
import { posix } from 'path'
import type { TelefuncFiles } from '../types'

async function loadTelefuncFilesFromConfig(runContext: {
  telefuncFilesManuallyProvidedByUser: string[]
  appRootDir: string | null
}): Promise<TelefuncFiles> {
  const { appRootDir } = runContext
  assertUsage(appRootDir, 'You need to set `telefuncConfig.root`.')
  const telefuncFilesLoaded: TelefuncFiles = {}
  await Promise.all(
    runContext.telefuncFilesManuallyProvidedByUser.map(async (telefuncFilePath) => {
      const path = posix.relative(toPosixPath(appRootDir), toPosixPath(telefuncFilePath))
      assertPosixPath(path)
      assertUsage(
        !path.startsWith('../'),
        `The telefunc file \`${telefuncFilePath}\` is not inlcuded in your project root \`${appRootDir}\`.`
      )
      assert(!path.startsWith('/') && !path.startsWith('.'))
      telefuncFilesLoaded['/' + path] = await dynamicImport(telefuncFilePath)
    })
  )
  return telefuncFilesLoaded
}
