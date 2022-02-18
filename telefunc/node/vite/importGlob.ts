export { importGlobOff }
export { importGlobOn }

import { writeFileSync } from 'fs'
const dir = __dirname + (() => '')() // trick to avoid `@vercel/ncc` to glob import
const telefuncFilesGlobPath = `${dir}/telefuncFilesGlob.js`
// Pattern `*([a-zA-Z0-9])` is an Extglob: https://github.com/micromatch/micromatch#extglobs
const importGlob = 'import.meta.glob("/**/*.telefunc.*([a-zA-Z0-9])")'

function importGlobOff() {
  writeFileSync(
    telefuncFilesGlobPath,
    // prettier-ignore
    [
      'exports.importGlobOff = true',
      ''
    ].join('\n'),
  )
}

function importGlobOn() {
  writeFileSync(
    telefuncFilesGlobPath,
    // prettier-ignore
    [
      `export const telefuncFilesGlob = ${importGlob};`,
      ''
    ].join('\n'),
  )
}
