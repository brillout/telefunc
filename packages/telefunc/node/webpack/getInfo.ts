export { getInfo }
export { getRoot }

import type { Loader, Compiler } from './types.js'
import { assert } from '../../utils/assert.js'

function getInfo(loader: Loader): { id: string; root: string; isClientSide: boolean; isDev: boolean } {
  assert(loader._compiler.name === 'client' || loader._compiler.name === 'server')
  const isClientSide = loader._compiler.name !== 'server'
  const root = getRoot(loader._compiler)
  assert(typeof loader.resource === 'string')
  const id = loader.resource
  assert(id.includes('.telefunc.'))
  assert(loader.mode === 'production' || loader.mode === 'development')
  const isDev = loader.mode === 'development'
  return { id, root, isClientSide, isDev }
}

function getRoot(compiler: Compiler): string {
  assert(typeof compiler.context === 'string')
  const root = compiler.context
  return root
}
