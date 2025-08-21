export { importGlobOff }
export { importGlobOn }

import { writeFileSync } from 'node:fs'
// We import node/server/utils.js instead of node/vite/utils.js because importGlobOff() is imported by webpack/loader.ts
import { javaScriptFileExtensionPattern, toPosixPath } from '../../server/utils.js'
import { createRequire } from 'node:module'
const require_ = createRequire(import.meta.url)
const telefuncFilesGlobFilePath = toPosixPath(require_.resolve('./telefuncFilesGlobFile.js'))
globalThis._telefunc ??= {}
globalThis._telefunc.telefuncFilesGlobFilePath = telefuncFilesGlobFilePath
declare global {
  var _telefunc: undefined | { telefuncFilesGlobFilePath?: string }
}
const importGlob = `import.meta.glob("/**/*.telefunc.${javaScriptFileExtensionPattern}")`

function importGlobOff() {
  writeFileSync(telefuncFilesGlobFilePath, '// Removed by importGlob/toggle.ts')
}

function importGlobOn() {
  writeFileSync(
    telefuncFilesGlobFilePath,
    // prettier-ignore
    [
      `export const telefuncFilesGlob = ${importGlob};`,
      // 'console.log("`.telefunc.js` files", Object.keys(telefuncFilesGlob))',
      '',
    ].join('\n'),
  )
}
