export { loadTelefuncFilesFromConfig }

import { assert, assertPosixPath, assertUsage, isTelefuncFilePath } from '../../utils'
import { posix } from 'path'
import type { TelefuncFiles } from '../types'
import { import_ } from '@brillout/import'
import pc from '@brillout/picocolors'
import { getServerConfig } from '../serverConfig'

async function loadTelefuncFilesFromConfig(runContext: {
  telefuncFilePath: string
}): Promise<{ telefuncFilesLoaded: TelefuncFiles; telefuncFilesAll: string[] }> {
  const { root, telefuncFiles } = getServerConfig()
  assertUsage(
    root,
    `You need to set ${pc.cyan('config.root')} to be able to use ${pc.cyan(
      'config.telefuncFiles'
    )}, see https://telefunc.com/root`
  )
  assert(telefuncFiles)
  assertPosixPath(root)
  const telefuncFilesLoaded: TelefuncFiles = {}
  const telefuncFilesAll: string[] = []
  await Promise.all(
    telefuncFiles.map(async (telefuncFilePathAbsolute) => {
      const telefuncFilePath = resolveTelefuncFilePath(telefuncFilePathAbsolute, root)
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
    `The telefunc file ${telefuncFilePathAbsolute} doesn't live inside the root directory ${appRootDir} of your project. Either move your telefunc file inside the root, or change ${pc.cyan(
      'config.root'
    )} (https://telefunc.com/root).`
  )
  assert(!path.startsWith('/') && !path.startsWith('.'))
  const telefuncFilePath = '/' + path
  assert(isTelefuncFilePath(telefuncFilePathAbsolute))
  return telefuncFilePath
}
