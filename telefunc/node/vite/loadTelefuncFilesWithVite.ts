export { loadTelefuncFilesWithVite }

import { assert, assertWarning, hasProp, isObject } from '../utils'
import { telefuncFilesGlobFilePath, telefuncFilesGlobFileNameBase } from './telefuncFilesGlobPath'
import { moduleExists, nodeRequire } from '../utils'
import { resolve } from 'path'
import type { ViteDevServer } from 'vite'
import { GlobFiles, loadGlobFiles } from './loadGlobFiles'

async function loadTelefuncFilesWithVite(runContext: {
  root: string | null
  viteDevServer: ViteDevServer | null
  isProduction: boolean
}) {
  const { notFound, moduleExports, provider } = await loadGlobImporter(runContext)

  if (notFound) {
    return { telefuncFiles: null }
  }

  // console.log('provider', provider)
  assert(isObject(moduleExports), { moduleExports, provider })
  assert(hasProp(moduleExports, 'telefuncFilesGlob'), { moduleExports, provider })
  const telefuncFilesGlob = moduleExports.telefuncFilesGlob as GlobFiles
  const telefuncFiles = await loadGlobFiles(telefuncFilesGlob)
  assert(isObjectOfObjects(telefuncFiles))
  return { telefuncFiles, viteProvider: provider }
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
    return { moduleExports, provider: 'DEV_SERVER' as const }
  }

  /*
  {
    let moduleExports: unknown | null = null
    try {
      moduleExports = await import('./telefuncFilesGlob')
    } catch (_) {}
    if (moduleExports !== null) {
      assert(!hasProp(moduleExports, 'importGlobUnset'))
      return { moduleExports, provider: 'DIRECT' as const }
    }
  }
  */

  {
    const moduleExports = await import('./telefuncFilesGlobFromDist')
    assert(!hasProp(moduleExports, 'distLinkUnset'))
    if (!hasProp(moduleExports, 'distLinkOff', 'true')) {
      assertProd(runContext)
      return { moduleExports, provider: 'DIST_LINK' as const }
    }
  }

  if (runContext.root) {
    const userDist = `${runContext.root}/dist`
    const prodPath = `${userDist}/server/${telefuncFilesGlobFileNameBase}.js`
    const prodPathResolved = resolve(prodPath)
    if (moduleExists(prodPathResolved)) {
      const moduleExports: unknown = nodeRequire(prodPathResolved)
      assertProd(runContext)
      return { moduleExports, provider: 'NODE_JS' as const }
    }
  }

  return { notFound: true }
}

function assertProd(runContext: { isProduction: boolean }) {
  assertWarning(
    runContext.isProduction === true,
    "This seems to be a production environment yet `telefuncConfig.isProduction !== true`. You should set `NODE_ENV.env='production' or `telefuncConfig.isProduction = true`.",
  )
}

function isObjectOfObjects(obj: unknown): obj is Record<string, Record<string, unknown>> {
  return isObject(obj) && Object.values(obj).every(isObject)
}
