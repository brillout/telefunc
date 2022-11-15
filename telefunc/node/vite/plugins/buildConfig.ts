export { buildConfig }

import type { Plugin } from 'vite'
import type { InputOption } from 'rollup'
import { telefuncFilesGlobFileNameBase } from '../importGlob/telefuncFilesGlobFileNameBase'
import { telefuncFilesGlobFilePath } from '../importGlob/telefuncFilesGlobPath'
import { assert, isObject, determineOutDir } from '../utils'

function buildConfig(): Plugin {
  return {
    name: 'telefunc:buildConfig',
    apply: 'build',
    config: (config) => {
      if (config.build?.ssr) {
        const input = {
          [telefuncFilesGlobFileNameBase]: telefuncFilesGlobFilePath,
          ...normalizeRollupInput(config.build?.rollupOptions?.input)
        }
        return {
          build: {
            rollupOptions: { input }
          }
        }
      }
    },
    configResolved(config) {
      const outDir = determineOutDir(config)
      if (outDir) config.build.outDir = outDir
    }
  }
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
