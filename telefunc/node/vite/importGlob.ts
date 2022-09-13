export { importGlobOff }
export { importGlobOn }

import { writeFileSync } from 'fs'
import { scriptFileExtensions } from './utils'
const dir = __dirname + (() => '')() // trick to avoid `@vercel/ncc` to glob import
const telefuncFilesGlobPath = `${dir}/telefuncFilesGlob.js`
const importGlob = `import.meta.glob("/**/*.telefunc.${scriptFileExtensions}")`

function importGlobOff() {
  writeFileSync(
    telefuncFilesGlobPath,
    // prettier-ignore
    [
      'exports.importGlobOff = true',
      ''
    ].join('\n')
  )
}

function importGlobOn() {
  writeFileSync(
    telefuncFilesGlobPath,
    // prettier-ignore
    [
      `export const telefuncFilesGlob = ${importGlob};`,
      // 'console.log("`.telefunc.js` files", Object.keys(telefuncFilesGlob))',
      ''
    ].join('\n')
  )
}
