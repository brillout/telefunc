export { loadTelefuncFilesWithVite }

import { loadBuild } from '@brillout/vite-plugin-import-build/loadBuild'
import { assert, assertWarning, getNodeEnv, hasProp, isObject, isProduction, isTelefuncFilePath } from '../utils'
import { telefuncFilesGlobFilePath } from './telefuncFilesGlobPath'
import type { ViteDevServer } from 'vite'
import { loadTelefuncFilesWithImportBuild } from './plugins/importBuild/loadBuild'

async function loadTelefuncFilesWithVite(runContext: {
  telefuncFilePath: string
  viteDevServer: ViteDevServer | null
}): Promise<null | {
  telefuncFilesLoaded: Record<string, Record<string, unknown>>
  telefuncFilesAll: string[]
  viteProvider: 'viteDevServer' | 'importBuild.cjs'
}> {
  const ret = await loadGlobImporter(runContext)
  if (!ret) {
    return null
  }
  const { moduleExports, viteProvider } = ret
  assert(isObject(moduleExports), { moduleExports, viteProvider })
  assert(hasProp(moduleExports, 'telefuncFilesGlob'), { moduleExports, viteProvider })
  const telefuncFilesGlob = moduleExports.telefuncFilesGlob as GlobFiles
  const { telefuncFilesLoaded, telefuncFilesAll } = await loadGlobFiles(telefuncFilesGlob, runContext)
  assert(isObjectOfObjects(telefuncFilesLoaded))
  return { telefuncFilesLoaded, viteProvider, telefuncFilesAll }
}

async function loadGlobImporter(runContext: { viteDevServer: ViteDevServer | null }) {
  if (runContext.viteDevServer) {
    const devPath = telefuncFilesGlobFilePath
    let moduleExports: unknown
    try {
      moduleExports = await runContext.viteDevServer.ssrLoadModule(devPath)
    } catch (err: unknown) {
      runContext.viteDevServer.ssrFixStacktrace(err as Error)
      throw err
    }
    return { moduleExports, viteProvider: 'viteDevServer' as const }
  }

  {
    const { success, entryFile } = await loadBuild()
    if (success) {
      const moduleExports = await loadTelefuncFilesWithImportBuild()
      assert(moduleExports, { entryFile })
      assertProd()
      return { moduleExports, viteProvider: 'importBuild.cjs' as const }
    }
  }

  return null
}

function assertProd() {
  if (!isProduction()) {
    const env = getNodeEnv()
    assert(env === undefined || env === 'development' || env === '')
    assertWarning(
      false,
      `This seems to be a production environment yet process.env.NODE_ENV is ${JSON.stringify(
        env
      )}. Set it to a different value such as "production" or "staging".`,
      { onlyOnce: true }
    )
  }
}

function isObjectOfObjects(obj: unknown): obj is Record<string, Record<string, unknown>> {
  return isObject(obj) && Object.values(obj).every(isObject)
}

type GlobFiles = Record<FilePath, () => Promise<Record<ExportName, ExportValue>>>
type FilePath = string
type ExportName = string
type ExportValue = unknown

async function loadGlobFiles(telefuncFilesGlob: GlobFiles, runContext: { telefuncFilePath: string }) {
  const telefuncFilesAll = Object.keys(telefuncFilesGlob)
  const telefuncFilesLoaded = Object.fromEntries(
    await Promise.all(
      Object.entries(telefuncFilesGlob)
        .filter(([telefuncFilePath]) => {
          assert(isTelefuncFilePath(telefuncFilePath))
          assert(isTelefuncFilePath(runContext.telefuncFilePath))
          return telefuncFilePath === runContext.telefuncFilePath
        })
        .map(async ([telefuncFilePath, loadModuleExports]) => [telefuncFilePath, await loadModuleExports()])
    )
  )
  assert(Object.keys(telefuncFilesLoaded).length <= 1)
  return { telefuncFilesAll, telefuncFilesLoaded }
}
