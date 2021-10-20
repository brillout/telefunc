import { assert, assertUsage, moduleExists } from '../server/utils'
import { resolve as pathResolve } from 'path'
import type { ViteDevServer } from 'vite'

export { loadEntry }

async function loadEntry({
  devPath,
  prodPath,
  isProduction,
  viteDevServer,
  errorMessage
}: {
  devPath: string
  prodPath: string
  isProduction: boolean
  viteDevServer: undefined | ViteDevServer
  errorMessage: string
}): Promise<unknown> {
  let moduleExports: unknown
  if (isProduction) {
    const prodPathResolved = pathResolve(prodPath)
    assertUsage(moduleExists(prodPathResolved), `${errorMessage}. (Build file ${prodPathResolved} is missing.)`)
    moduleExports = require_(prodPathResolved)
  } else {
    assert(viteDevServer)
    const devPathResolved = requireResolve(devPath)
    try {
      moduleExports = await viteDevServer.ssrLoadModule(devPathResolved)
    } catch (err) {
      viteDevServer.ssrFixStacktrace(err)
      throw err
    }
  }
  return moduleExports
}

function require_(modulePath: string): unknown {
  // `req` instead of `require` so that Webpack doesn't do dynamic dependency analysis
  const req = require
  return req(modulePath)
}
function requireResolve(modulePath: string): string {
  // `req` instead of `require` so that Webpack doesn't do dynamic dependency analysis
  const req = require
  return req.resolve(modulePath)
}

