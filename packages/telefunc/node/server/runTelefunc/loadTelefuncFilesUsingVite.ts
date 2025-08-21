export { loadTelefuncFilesUsingVite }

import { importServerProductionEntry } from '@brillout/vite-plugin-server-entry/runtime'
import { assert, assertWarning, getNodeEnv, hasProp, isObject, isProduction, isTelefuncFilePath } from '../utils.js'
import { loadTelefuncFilesWithImportBuild } from './loadTelefuncFilesUsingVite/loadBuildEntry.js'
import { getViteDevServer } from '../globalContext.js'

async function loadTelefuncFilesUsingVite(
  runContext: { telefuncFilePath: string },
  failOnFailure: boolean,
): Promise<null | {
  telefuncFilesLoaded: Record<string, Record<string, unknown>>
  telefuncFilesAll: string[]
  viteProvider: 'Vite' | '@brillout/vite-plugin-server-entry'
}> {
  const res = await loadGlobEntryFile(failOnFailure)
  if (!res) return null
  const { moduleExports, viteProvider } = res
  assert(isObject(moduleExports), { moduleExports, viteProvider })
  assert(hasProp(moduleExports, 'telefuncFilesGlob'), { moduleExports, viteProvider })
  const telefuncFilesGlob = moduleExports.telefuncFilesGlob as GlobFiles
  const { telefuncFilesLoaded, telefuncFilesAll } = await loadViteGlobbedFiles(telefuncFilesGlob, runContext)
  assert(isObjectOfObjects(telefuncFilesLoaded))
  return { telefuncFilesLoaded, viteProvider, telefuncFilesAll }
}

async function loadGlobEntryFile(failOnFailure: boolean) {
  const viteDevServer = getViteDevServer()
  if (viteDevServer) {
    const moduleExports = await viteDevServer.ssrLoadModule('virtual:telefunc-files-glob', { fixStacktrace: true })
    return { moduleExports, viteProvider: 'Vite' as const }
  } else {
    let moduleExports: unknown
    moduleExports = await loadTelefuncFilesWithImportBuild()
    if (moduleExports === null) {
      const tolerateDoesNotExist = !failOnFailure
      const success = await importServerProductionEntry({ tolerateDoesNotExist })
      moduleExports = await loadTelefuncFilesWithImportBuild()
      if (success === false) {
        assert(tolerateDoesNotExist)
        assert(!moduleExports)
        return null
      }
      assert(moduleExports)
    } else {
      assert(moduleExports)
    }
    assertProd()
    return { moduleExports, viteProvider: '@brillout/vite-plugin-server-entry' as const }
  }
}

function assertProd() {
  if (!isProduction()) {
    const env = getNodeEnv()
    assert(env === undefined || env === 'development' || env === '')
    assertWarning(
      false,
      `This seems to be a production environment yet process.env.NODE_ENV is ${JSON.stringify(
        env,
      )}. Set it to a different value such as "production" or "staging".`,
      { onlyOnce: true },
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

// Vite's import.meta.glob() returns promises
async function loadViteGlobbedFiles(telefuncFilesGlob: GlobFiles, runContext: { telefuncFilePath: string }) {
  const telefuncFilesAll = Object.keys(telefuncFilesGlob)
  const telefuncFilesLoaded = Object.fromEntries(
    await Promise.all(
      Object.entries(telefuncFilesGlob)
        .filter(([telefuncFilePath]) => {
          assert(isTelefuncFilePath(telefuncFilePath))
          assert(isTelefuncFilePath(runContext.telefuncFilePath))
          return telefuncFilePath === runContext.telefuncFilePath
        })
        .map(async ([telefuncFilePath, loadModuleExports]) => [telefuncFilePath, await loadModuleExports()]),
    ),
  )
  assert(Object.keys(telefuncFilesLoaded).length <= 1)
  return { telefuncFilesAll, telefuncFilesLoaded }
}
