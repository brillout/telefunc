export { importGlobOff }
export { importGlobOn }

import { writeFileSync } from 'node:fs'
import { scriptFileExtensions } from '../utils.js'
import { createRequire } from 'node:module'
const require_ = createRequire(import.meta.url)
const telefuncFilesGlobFilePath = require_.resolve('./telefuncFilesGlob.js')
globalThis._telefunc ??= {}
globalThis._telefunc.telefuncFilesGlobFilePath = telefuncFilesGlobFilePath
declare global {
  var _telefunc: undefined | { telefuncFilesGlobFilePath?: string }
}
const importGlob = `import.meta.glob("/**/*.telefunc.${scriptFileExtensions}")`

function importGlobOff() {
  writeFileSync(telefuncFilesGlobFilePath, ['exports.importGlobOff = true', ''].join('\n'))
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
