export { loadTelefuncFilesFromConfig }

import { assert, assertPosixPath, assertUsage, isTelefuncFilePath } from '../../utils'
import { posix } from 'path'
import type { TelefuncFiles } from '../types'
import { import_ } from '@brillout/import'

async function loadTelefuncFilesFromConfig(runContext: {
  telefuncFilesManuallyProvidedByUser: string[]
  appRootDir: string | null
  telefuncFilePath: string
}): Promise<{ telefuncFilesLoaded: TelefuncFiles; telefuncFilesAll: string[] }> {
  const { appRootDir } = runContext
  assertUsage(appRootDir, 'You need to set `telefuncConfig.root` to be able to use `telefuncConfig.telefuncFiles`')
  assertPosixPath(appRootDir)
  const telefuncFilesLoaded: TelefuncFiles = {}
  const telefuncFilesAll: string[] = []
  await Promise.all(
    runContext.telefuncFilesManuallyProvidedByUser.map(async (telefuncFilePathAbsolute) => {
      const telefuncFilePath = resolveTelefuncFilePath(telefuncFilePathAbsolute, appRootDir)
      telefuncFilesAll.push(telefuncFilePath)
      assert(isTelefuncFilePath(runContext.telefuncFilePath))
      assert(isTelefuncFilePath(telefuncFilePath))
      if (telefuncFilePath !== runContext.telefuncFilePath) {
        return
      }
      const telefunctions: any = await import_(telefuncFilePathAbsolute)
      telefuncFilesLoaded[telefuncFilePath] = telefunctions
    })
  )
  return { telefuncFilesLoaded, telefuncFilesAll }
}

function resolveTelefuncFilePath(telefuncFilePathAbsolute: string, appRootDir: string): string {
  assertPosixPath(telefuncFilePathAbsolute)
  const path = posix.relative(appRootDir, telefuncFilePathAbsolute)
  assertPosixPath(path)
  assertUsage(
    !path.startsWith('../'),
    `Your telefunc file \`${telefuncFilePathAbsolute}\` is not inlcuded in your project root \`${appRootDir}\`.`
  )
  assert(!path.startsWith('/') && !path.startsWith('.'))
  const telefuncFilePath = '/' + path
  assert(isTelefuncFilePath(telefuncFilePathAbsolute))
  return telefuncFilePath
}
