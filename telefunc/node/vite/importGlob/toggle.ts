export { importGlobOff }
export { importGlobOn }

import { writeFileSync } from 'node:fs'
import { scriptFileExtensions } from '../utils.js'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const __dirname_ = path.dirname(fileURLToPath(import.meta.url))
const telefuncFilesGlobPath = `${__dirname_}/telefuncFilesGlob.js`
const importGlob = `import.meta.glob("/**/*.telefunc.${scriptFileExtensions}")`

function importGlobOff() {
  writeFileSync(telefuncFilesGlobPath, ['exports.importGlobOff = true', ''].join('\n'))
}

function importGlobOn() {
  writeFileSync(
    telefuncFilesGlobPath,
    // prettier-ignore
    [
      `export const telefuncFilesGlob = ${importGlob};`,
      // 'console.log("`.telefunc.js` files", Object.keys(telefuncFilesGlob))',
      '',
    ].join('\n'),
  )
}
