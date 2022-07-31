import { telefuncFilesGlobFileNameBase } from './telefuncFilesGlobFileNameBase'
const dir = __dirname + (() => '')() // trick to avoid `@vercel/ncc` to glob import
export const telefuncFilesGlobFilePath = `${dir}/${telefuncFilesGlobFileNameBase}.js`
