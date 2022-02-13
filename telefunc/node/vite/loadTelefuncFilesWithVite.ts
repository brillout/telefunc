export { loadTelefuncFilesWithVite }

import { assert, assertWarning, hasProp, isObject } from '../utils'
import { TelefuncFiles } from '../server/types'
import { importTelefuncFilesFilePath, importTelefuncFilesFileNameBase } from './importTelefuncFilesPath'
import { moduleExists, nodeRequire } from '../utils'
import { resolve } from 'path'
import type { ViteDevServer } from 'vite'
import type { GlobFiles } from './importTelefuncFiles'

async function loadTelefuncFilesWithVite(runContext: {
  root: string | null
  viteDevServer: ViteDevServer | null
  isProduction: boolean
}): Promise<null | TelefuncFiles> {
  const { notFound, moduleExports } = await loadGlobImporter(runContext)

  if (notFound) {
    return null
  }

  assert(isObject(moduleExports))
  assert(hasProp(moduleExports, 'importTelefuncFiles', 'function'))
  const globFiles = moduleExports.importTelefuncFiles() as GlobFiles
  const telefuncFiles = await loadGlobFiles(globFiles)
  assert(isObjectOfObjects(telefuncFiles))
  return telefuncFiles
}

async function loadGlobImporter(runContext: {
  root: string | null
  viteDevServer: ViteDevServer | null
  isProduction: boolean
}) {
  if (runContext.viteDevServer) {
    const devPath = importTelefuncFilesFilePath
    let moduleExports: unknown
    try {
      moduleExports = await runContext.viteDevServer.ssrLoadModule(devPath)
    } catch (err: unknown) {
      runContext.viteDevServer.ssrFixStacktrace(err as Error)
      throw err
    }
    return { moduleExports }
  }

  if (runContext.root) {
    const userDist = `${runContext.root}/dist`
    const prodPath = `${userDist}/server/${importTelefuncFilesFileNameBase}.js`
    const prodPathResolved = resolve(prodPath)
    if (moduleExists(prodPathResolved)) {
      const moduleExports: unknown = nodeRequire(prodPathResolved)
      assertWarning(
        runContext.isProduction === true,
        "This seems to be a production environment yet `telefuncConfig.isProduction !== true`. You should set `NODE_ENV.env='production' or `telefuncConfig.isProduction = true`.",
      )
      return { moduleExports }
    }
  }

  return { notFound: true }
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
