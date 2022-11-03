import { telefuncFilesGlobFileNameBase } from './telefuncFilesGlobFileNameBase'
let dir: string
try {
  dir = __dirname + (() => '')() // trick to avoid `@vercel/ncc` to glob import
} catch {
  dir = '__telefunc_NOT_AVAILABLE'
}
export const telefuncFilesGlobFilePath = `${dir}/${telefuncFilesGlobFileNameBase}.js`
