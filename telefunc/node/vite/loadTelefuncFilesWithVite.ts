export { loadTelefuncFilesWithVite }

import { loadImportBuildFile } from 'vite-plugin-import-build/loadImportBuildFile'
import { assert, assertWarning, hasProp, isObject } from '../utils'
import { telefuncFilesGlobFilePath } from './telefuncFilesGlobPath'
import type { ViteDevServer } from 'vite'
import { GlobFiles, loadGlobFiles } from './loadGlobFiles'
import { loadTelefuncFilesWithImportBuild } from './plugins/importBuild/loadBuild'

async function loadTelefuncFilesWithVite(runContext: {
  root: string | null
  viteDevServer: ViteDevServer | null
  isProduction: boolean
}) {
  const { notFound, moduleExports, provider } = await loadGlobImporter(runContext)

  if (notFound) {
    return { telefuncFilesLoaded: null }
  }

  // console.log('provider', provider)
  assert(isObject(moduleExports), { moduleExports, provider })
  assert(hasProp(moduleExports, 'telefuncFilesGlob'), { moduleExports, provider })
  const telefuncFilesGlob = moduleExports.telefuncFilesGlob as GlobFiles
  const telefuncFilesLoaded = await loadGlobFiles(telefuncFilesGlob)
  assert(isObjectOfObjects(telefuncFilesLoaded))
  return { telefuncFilesLoaded, viteProvider: provider }
}

async function loadGlobImporter(runContext: {
  root: string | null
  viteDevServer: ViteDevServer | null
  isProduction: boolean
}) {
  if (runContext.viteDevServer) {
    const devPath = telefuncFilesGlobFilePath
    let moduleExports: unknown
    try {
      moduleExports = await runContext.viteDevServer.ssrLoadModule(devPath)
    } catch (err: unknown) {
      runContext.viteDevServer.ssrFixStacktrace(err as Error)
      throw err
    }
    return { moduleExports, provider: 'viteDevServer' as const }
  }

  {
    const { success, entryFile } = await loadImportBuildFile()
    if (success) {
      const moduleExports = await loadTelefuncFilesWithImportBuild()
      assert(moduleExports, { entryFile })
      assertProd(runContext)
      return { moduleExports, provider: 'importBuild.cjs' as const }
    }
  }

  return { notFound: true }
}

function assertProd(runContext: { isProduction: boolean }) {
  assertWarning(
    runContext.isProduction === true,
    "This seems to be a production environment yet `telefuncConfig.isProduction !== true`. You should set `NODE_ENV.env='production' or `telefuncConfig.isProduction = true`.",
    { onlyOnce: true }
  )
}

function isObjectOfObjects(obj: unknown): obj is Record<string, Record<string, unknown>> {
  return isObject(obj) && Object.values(obj).every(isObject)
}
