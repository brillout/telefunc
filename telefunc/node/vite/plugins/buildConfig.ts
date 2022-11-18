export { buildConfig }

import type { Plugin, ResolvedConfig } from 'vite'
import type { InputOption } from 'rollup'
import { telefuncFilesGlobFileNameBase } from '../importGlob/telefuncFilesGlobFileNameBase'
import { telefuncFilesGlobFilePath } from '../importGlob/telefuncFilesGlobPath'
import { assert, assertUsage, isObject, determineOutDir } from '../utils'

function buildConfig(): Plugin[] {
  let config: ResolvedConfig
  return [
    {
      name: 'telefunc:buildConfig',
      apply: 'build',
      enforce: 'post',
      configResolved(config_) {
        config = config_
        setOutDir(config)
        addRollupInput(config)
      }
    },
    {
      name: 'telefunc:buildConfig:assert',
      apply: 'build',
      enforce: 'pre',
      generateBundle(_rollupOptions, rollupBundle) {
        assertRollupInput(rollupBundle, config)
      }
    }
  ]
}

function setOutDir(config: ResolvedConfig) {
  const outDir = determineOutDir(config)
  if (outDir) config.build.outDir = outDir
}

function addRollupInput(config: ResolvedConfig) {
  if (!config.build?.ssr) return
  config.build.rollupOptions.input = normalizeRollupInput(config.build.rollupOptions.input)
  config.build.rollupOptions.input[telefuncFilesGlobFileNameBase] = telefuncFilesGlobFilePath
}
function assertRollupInput(rollupBundle: Record<string, unknown>, config: ResolvedConfig) {
  if (!config.build?.ssr) return
  const name1 = `${telefuncFilesGlobFileNameBase}.js`
  const name2 = `${telefuncFilesGlobFileNameBase}.mjs`
  const entries = Object.keys(rollupBundle)
  assertUsage(
    entries.includes(name1) || entries.includes(name2),
    "You seem to be using a tool that conflicts with Telefunc. Reach out to a Telefunc maintainer. (Info for maintainer: couldn't find Telefunc's Rollup input entry.)"
  )
}
function normalizeRollupInput(input?: InputOption): Record<string, string> {
  if (!input) {
    return {}
  }
  if (typeof input === 'string') {
    input = [input]
  }
  if (Array.isArray(input)) {
    return Object.fromEntries(input.map((input) => [input, input]))
  }
  assert(isObject(input))
  return input
}
