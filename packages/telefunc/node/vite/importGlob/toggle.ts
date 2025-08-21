export { importGlobOff }
export { importGlobOn }
export { getVirtualModuleContent }

// We import node/server/utils.js instead of node/vite/utils.js because importGlobOff() is imported by webpack/loader.ts
import { javaScriptFileExtensionPattern } from '../../server/utils.js'

// Virtual module ID for Vite
export const VIRTUAL_MODULE_ID = 'virtual:telefunc-files-glob'

// Global state for virtual module content
globalThis._telefunc ??= {}
globalThis._telefunc.virtualModuleContent = '// Removed by importGlob/toggle.ts'

declare global {
  var _telefunc: undefined | {
    virtualModuleContent?: string
  }
}

const importGlob = `import.meta.glob("/**/*.telefunc.${javaScriptFileExtensionPattern}")`

function importGlobOff() {
  // Update virtual module content
  globalThis._telefunc!.virtualModuleContent = '// Removed by importGlob/toggle.ts'
}

function importGlobOn() {
  const content = [
    `export const telefuncFilesGlob = ${importGlob};`,
    // 'console.log("`.telefunc.js` files", Object.keys(telefuncFilesGlob))',
    '',
  ].join('\n')

  // Update virtual module content
  globalThis._telefunc!.virtualModuleContent = content
}

function getVirtualModuleContent(): string {
  return globalThis._telefunc?.virtualModuleContent || '// Removed by importGlob/toggle.ts'
}
