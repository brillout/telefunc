import { assert, hasProp, isObject } from '../utils'
import type { ViteDevServer } from 'vite'
import { loadViteEntry } from './loadViteEntry'
import { TelefuncFiles } from '../server/types'
import { importTelefuncFilesFilePath } from './importTelefuncFilesPath'
import type { GlobFiles } from './importTelefuncFiles'

export { loadTelefuncFilesWithVite }

async function loadTelefuncFilesWithVite(runContext: {
  root: string
  viteDevServer: ViteDevServer | null
  isProduction: boolean
}): Promise<TelefuncFiles> {
  const viteEntryFile = 'importTelefuncFiles.js'
  // Vite occasionally chokes upon `moduleExists()` in dev
  // assert(moduleExists(`./${viteEntryFile}`, __dirname))

  const userDist = `${runContext.root}/dist`
  const prodPath = `${userDist}/server/${viteEntryFile}`

  const devPath = importTelefuncFilesFilePath

  const errorMessage =
    'Make sure to run `vite build && vite build --ssr` before running your Node.js server with `createTelefuncCaller({ isProduction: true })`'

  const moduleExports = await loadViteEntry({
    devPath,
    prodPath,
    errorMessage,
    viteDevServer: runContext.viteDevServer,
    isProduction: runContext.isProduction,
  })

  assert(isObject(moduleExports))
  assert(hasProp(moduleExports, 'importTelefuncFiles', 'function'))
  const globFiles = moduleExports.importTelefuncFiles() as GlobFiles
  const telefuncFiles = await loadGlobFiles(globFiles)
  assert(isObjectOfObjects(telefuncFiles))
  return telefuncFiles
}

async function loadGlobFiles(globFiles: GlobFiles): Promise<Record<string, Record<string, unknown>>> {
  return Object.fromEntries(
    await Promise.all(
      Object.entries(globFiles).map(async ([filePath, loadModuleExports]) => [filePath, await loadModuleExports()]),
    ),
  )
}

function isObjectOfObjects(obj: unknown): obj is Record<string, Record<string, unknown>> {
  return isObject(obj) && Object.values(obj).every(isObject)
}
