export { telefuncFilesGlobFilePath }

import { toPosixPath } from '../utils.js'

let dir: string
try {
  dir = __dirname + (() => '')() // trick to avoid `@vercel/ncc` to glob import
} catch {
  dir = '__telefunc_NOT_AVAILABLE'
}
const telefuncFilesGlobFilePath = toPosixPath(`${dir}/telefuncFilesGlob.js`)
