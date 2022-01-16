export { loadTelefuncFiles }

import type { ViteDevServer } from 'vite'
import type { TelefuncFiles } from '../types'
import { join } from 'path'
import { statSync } from 'fs'
import { assert } from '../../shared/utils'
import { loadTelefuncFilesWithVite } from '../../plugin/vite/loadTelefuncFilesWithVite'
import { loadTelefuncFilesWithWebpack } from '../../plugin/webpack/loadTelefuncFilesWithWebpack'
import { loadTelefuncFilesWithInternalMechanism } from './loadTelefuncFilesWithInternalMechanism'
import { hasProp } from '../utils'

type BundlerName = 'webpack' | 'nextjs' | 'vite' | 'unknown'

async function loadTelefuncFiles(runContext: {
  _root: string | null
  _viteDevServer: ViteDevServer | null
  _telefuncFilesProvidedByUser: TelefuncFiles | null
  _isProduction: boolean
}): Promise<TelefuncFiles | null> {
  if (runContext._telefuncFilesProvidedByUser) {
    return runContext._telefuncFilesProvidedByUser
  }

  {
    const telefuncFiles = loadTelefuncFilesWithInternalMechanism()
    if (telefuncFiles) {
      return telefuncFiles
    }
  }

  const bundlerName = getBundlerName(runContext)

  if (bundlerName === 'vite' || bundlerName === 'unknown') {
    assert(hasProp(runContext, '_root', 'string'))
    return loadTelefuncFilesWithVite(runContext)
  }

  if (bundlerName === 'webpack') {
    assert(hasProp(runContext, '_root', 'string'))
    return loadTelefuncFilesWithWebpack(runContext)
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
