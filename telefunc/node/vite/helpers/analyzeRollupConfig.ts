export { analyzeRollupConfig }

import type { ResolvedConfig } from 'vite'
import { assert, isSSR_config } from '../utils'

// Subset of: `import type { NormalizedOutputOptions } from 'rollup'` (to avoid mismatch upon different Rollup versions)
type NormalizedOutputOptions = { entryFileNames: string | ((chunkInfo: any) => string); format: string }
// Subset of: `import type { OutputBundle } from 'rollup'` (to avoid mismatch upon different Rollup versions)
type OutputBundle = Record<string, unknown>
type RollupResolved = {
  options: NormalizedOutputOptions
  bundle: OutputBundle
}

function analyzeRollupConfig(rollupResolved: RollupResolved, config: ResolvedConfig) {
  assert(isSSR_config(config))
  const isEsm = isEsmFormat(rollupResolved)
  return { isEsm }
}

function isEsmFormat(rollupResolved: RollupResolved): boolean {
  const { format } = rollupResolved.options
  assert(typeof format === 'string')
  assert(
    format === 'amd' ||
      format === 'cjs' ||
      format === 'es' ||
      format === 'iife' ||
      format === 'system' ||
      format === 'umd'
  )
  return format === 'es'
}
