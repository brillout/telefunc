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
      const outDir = determineOutDir(config)
      if (!config.build?.ssr) {
        return {
          build: {
            outDir
          }
        }
      } else {
        const input = {
          [telefuncFilesGlobFileNameBase]: telefuncFilesGlobFilePath,
          ...normalizeRollupInput(config.build?.rollupOptions?.input)
        }
        return {
          build: {
            rollupOptions: { input },
            outDir
          }
        }
      }
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
