import { Plugin } from 'vite'
import type { InputOption } from 'rollup'
import { assert, isObject } from '../utils'
import { telefuncFilesGlobFileNameBase, telefuncFilesGlobFilePath } from './telefuncFilesGlobPath'
import { isSSR_config } from './utils'

export { build }

function build(): Plugin {
  return {
    name: 'telefunc:build',
    apply: 'build',
    config: (config) => {
      if (!isSSR_config(config)) {
        return {
          build: {
            outDir: 'dist/client',
          },
        }
      } else {
        const viteEntry = getViteEntry()
        const input = {
          ...viteEntry,
          ...normalizeRollupInput(config.build?.rollupOptions?.input),
        }
        return {
          build: {
            rollupOptions: { input },
            outDir: 'dist/server',
          },
        }
      }
    },
  }
}

function normalizeRollupInput(input?: InputOption): Record<string, string> {
  if (!input) {
    return {}
  }
  /*
  if (typeof input === "string") {
    return { [input]: input };
  }
  if (Array.isArray(input)) {
    return Object.fromEntries(input.map((i) => [i, i]));
  }
  */
  assert(isObject(input))
  return input
}

function getViteEntry() {
  const viteEntry = {
    [telefuncFilesGlobFileNameBase]: telefuncFilesGlobFilePath,
  }
  return viteEntry
}
