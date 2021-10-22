import { assert, assertUsage } from '../server/utils'
import type { ViteDevServer } from 'vite'
import { TelefuncFilesUntyped } from '../server/types'
import { join } from 'path'
import { statSync } from 'fs'
import { loadTelefuncFilesWithVite } from './vite/loadTelefuncFilesWithVite'
import { loadTelefuncFilesWithWebpack } from './webpack/loadTelefuncFilesWithWebpack'

export { loadTelefuncFiles }

type BundlerName = 'webpack' | 'vite' | null

async function loadTelefuncFiles(telefuncContext: {
  _root: string
  _viteDevServer?: ViteDevServer
  _isProduction: boolean
}): Promise<TelefuncFilesUntyped> {
  const bundlerName = getBundlerName(telefuncContext)

  if (bundlerName === 'vite') {
    return loadTelefuncFilesWithVite(telefuncContext)
  }

  if (bundlerName === 'webpack') {
    return loadTelefuncFilesWithWebpack(telefuncContext)
  }

  assert(bundlerName === null)
  assertUsage(false, 'Only Vite and Webpack are supported for now. Let us know about your stack on Discord or GitHub.')
}

// TODO: rethink this
function getBundlerName({ _viteDevServer }: Record<string, unknown>): BundlerName {
  if (_viteDevServer) {
    return 'vite'
  }
  if (isWebpack()) {
    return 'webpack'
  }
  // TODO: how to add check for prod?
  return 'vite'
  /*
  return null;
  */
}

function isWebpack() {
  // TODO: make this test more robust
  const webpackConfigFile = 'webpack.js'
  return pathExits(join(process.cwd(), webpackConfigFile))
}

function pathExits(path: string) {
  try {
    // `throwIfNoEntry: false` isn't supported in older Node.js versions
    return !!statSync(path /*{ throwIfNoEntry: false }*/)
  } catch (err) {
    return false
  }
}
