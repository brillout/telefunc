import type { ViteDevServer } from 'vite'
import type { TelefuncFiles, TelefuncFilesUntyped } from '../server/types'
import { join } from 'path'
import { statSync } from 'fs'
import { loadTelefuncFilesWithVite } from './vite/loadTelefuncFilesWithVite'
import { loadTelefuncFilesWithWebpack } from './webpack/loadTelefuncFilesWithWebpack'
import { assert } from '../shared/utils'

export { loadTelefuncFiles }

type BundlerName = 'webpack' | 'nextjs' | 'vite' | 'unknown'

async function loadTelefuncFiles(telefuncContext: {
  _root: string
  _viteDevServer?: ViteDevServer
  _telefuncFilesProvidedByUser: null | TelefuncFiles
  _isProduction: boolean
}): Promise<TelefuncFilesUntyped | null> {
  const bundlerName = getBundlerName(telefuncContext)

  if (telefuncContext._telefuncFilesProvidedByUser) {
    return telefuncContext._telefuncFilesProvidedByUser
  }

  if (bundlerName === 'vite' || bundlerName === 'unknown') {
    return loadTelefuncFilesWithVite(telefuncContext)
  }

  if (bundlerName === 'webpack') {
    return loadTelefuncFilesWithWebpack(telefuncContext)
  }

  if (bundlerName === 'nextjs') {
    // TODO: WIP
    return null
  }

  assert(false)
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
  return 'unknown'
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
