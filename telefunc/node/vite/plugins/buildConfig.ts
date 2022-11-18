export { buildConfig }

import type { Plugin, ResolvedConfig } from 'vite'
import type { InputOption } from 'rollup'
import { telefuncFilesGlobFileNameBase } from '../importGlob/telefuncFilesGlobFileNameBase'
import { telefuncFilesGlobFilePath } from '../importGlob/telefuncFilesGlobPath'
import { assert, isObject, determineOutDir } from '../utils'

function buildConfig(): Plugin {
  return {
    name: 'telefunc:buildConfig',
    apply: 'build',
    enforce: 'post',
    configResolved(config) {
      setOutDir(config)
      addRollupInput(config)
    }
  }
}

function setOutDir(config: ResolvedConfig) {
  const outDir = determineOutDir(config)
  if (outDir) config.build.outDir = outDir
}

function addRollupInput(config: ResolvedConfig) {
  if (!config.build?.ssr) {
    return
  }
  config.build.rollupOptions.input = normalizeRollupInput(config.build.rollupOptions.input)
  config.build.rollupOptions.input[telefuncFilesGlobFileNameBase] = telefuncFilesGlobFilePath
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
