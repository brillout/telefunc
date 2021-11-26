import { assert, assertUsage } from '../server/utils'
import type { ViteDevServer } from 'vite'
import { TelefuncFilesUntyped } from '../server/types'
import { join } from 'path'
import { statSync } from 'fs'
import { loadTelefuncFilesWithVite } from './vite/loadTelefuncFilesWithVite'
import { loadTelefuncFilesWithWebpack } from './webpack/loadTelefuncFilesWithWebpack'

export { loadTelefuncFiles }

type BundlerName = 'webpack' | 'nextjs' | 'vite' | null

async function loadTelefuncFiles(telefuncContext: {
  _root: string
  _viteDevServer?: ViteDevServer
  _isProduction: boolean
}): Promise<TelefuncFilesUntyped | null> {
  const bundlerName = getBundlerName(telefuncContext)

  if (bundlerName === 'vite') {
    return loadTelefuncFilesWithVite(telefuncContext)
  }

  if (bundlerName === 'webpack') {
    return loadTelefuncFilesWithWebpack(telefuncContext)
  }

  if (bundlerName === 'nextjs') {
    // TODO: WIP
    return null
  }

  return null
}

// TODO: rethink this
function getBundlerName({ _viteDevServer }: Record<string, unknown>): BundlerName {
  if (_viteDevServer) {
    return 'vite'
  }
  if (isWebpack()) {
    return 'webpack'
  }
  if (isNextjs()) {
    return 'nextjs'
  }
  return null;
}

function isWebpack() {
  // TODO: make this test more robust
  const webpackConfigFile = 'webpack.js'
  return pathExits(join(process.cwd(), webpackConfigFile))
}

function isNextjs() {
  return pathExits(join(process.cwd(), '.next'))
}

function pathExits(path: string) {
  try {
    // `throwIfNoEntry: false` isn't supported in older Node.js versions
    return !!statSync(path /*{ throwIfNoEntry: false }*/)
  } catch (err) {
    return false
  }
}
