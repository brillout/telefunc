import { assert, assertUsage, moduleExists, nodeRequire } from '../server/utils'
import { resolve as pathResolve } from 'path'
import type { ViteDevServer } from 'vite'

export { loadViteEntry }

async function loadViteEntry({
  devPath,
  prodPath,
  isProduction,
  viteDevServer,
  errorMessage,
}: {
  devPath: string
  prodPath: string
  isProduction: boolean
  viteDevServer: ViteDevServer | null
  errorMessage: string
}): Promise<unknown> {
  let moduleExports: unknown
  if (isProduction) {
    const prodPathResolved = pathResolve(prodPath)
    assertUsage(moduleExists(prodPathResolved), `${errorMessage}. (Build file ${prodPathResolved} is missing.)`)
    moduleExports = nodeRequire(prodPathResolved)
  } else {
    assert(viteDevServer)
    devPath = nodeRequire.resolve(devPath)
    assert(moduleExists(devPath))
    try {
      moduleExports = await viteDevServer.ssrLoadModule(devPath)
    } catch (err: unknown) {
      viteDevServer.ssrFixStacktrace(err as Error)
      throw err
    }
  }
  return moduleExports
}
