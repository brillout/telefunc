export { importGlobOff, importGlobOn, getVirtualModuleContent }

import { javaScriptFileExtensionPattern } from '../../server/utils.js'

export const VIRTUAL_MODULE_ID = 'virtual:telefunc-files-glob'

const DISABLED_CONTENT = '// Virtual module disabled'
const importGlobPattern = `import.meta.glob("/**/*.telefunc.${javaScriptFileExtensionPattern}")`

declare global {
  var _telefunc:
    | undefined
    | {
        virtualModuleContent?: string
      }
}

// Initialize global state
globalThis._telefunc ??= {}
globalThis._telefunc.virtualModuleContent ??= DISABLED_CONTENT

function importGlobOff(): void {
  ensureGlobalState()
  globalThis._telefunc!.virtualModuleContent = DISABLED_CONTENT
}

function importGlobOn(): void {
  ensureGlobalState()
  globalThis._telefunc!.virtualModuleContent = `export const telefuncFilesGlob = ${importGlobPattern};`
}

function getVirtualModuleContent(): string {
  return globalThis._telefunc?.virtualModuleContent ?? DISABLED_CONTENT
}

function ensureGlobalState(): void {
  globalThis._telefunc ??= {}
}
