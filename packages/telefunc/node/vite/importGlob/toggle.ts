export { importGlobOff }
export { importGlobOn }
export { getVirtualModuleContent }

// We import node/server/utils.js instead of node/vite/utils.js because importGlobOff() is imported by webpack/loader.ts
import { javaScriptFileExtensionPattern, toPosixPath } from '../../server/utils.js'
import { createRequire } from 'node:module'

const require_ = createRequire(import.meta.url)
const telefuncFilesGlobFilePath = toPosixPath(require_.resolve('./telefuncFilesGlobFile.js'))

// Virtual module ID for Vite
export const VIRTUAL_MODULE_ID = 'virtual:telefunc-files-glob'
const RESOLVED_VIRTUAL_MODULE_ID = '\0' + VIRTUAL_MODULE_ID

// Global state for virtual module content
globalThis._telefunc ??= {}
globalThis._telefunc.telefuncFilesGlobFilePath = telefuncFilesGlobFilePath
globalThis._telefunc.virtualModuleContent = '// Removed by importGlob/toggle.ts'

declare global {
  var _telefunc: undefined | {
    telefuncFilesGlobFilePath?: string
    virtualModuleContent?: string
  }
}

const importGlob = `import.meta.glob("/**/*.telefunc.${javaScriptFileExtensionPattern}")`

function importGlobOff() {
  // For webpack compatibility, still write to file system
  const { writeFileSync } = require('node:fs')
  writeFileSync(telefuncFilesGlobFilePath, '// Removed by importGlob/toggle.ts')

  // Update virtual module content
  globalThis._telefunc!.virtualModuleContent = '// Removed by importGlob/toggle.ts'
}

function importGlobOn() {
  const content = [
    `export const telefuncFilesGlob = ${importGlob};`,
    // 'console.log("`.telefunc.js` files", Object.keys(telefuncFilesGlob))',
    '',
  ].join('\n')

  // For webpack compatibility, still write to file system
  const { writeFileSync } = require('node:fs')
  writeFileSync(telefuncFilesGlobFilePath, content)

  // Update virtual module content
  globalThis._telefunc!.virtualModuleContent = content
}

function getVirtualModuleContent(): string {
  return globalThis._telefunc?.virtualModuleContent || '// Removed by importGlob/toggle.ts'
}
