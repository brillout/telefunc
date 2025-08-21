export { virtualFile }

import type { Plugin } from 'vite'
import { javaScriptFileExtensionPattern } from '../utils.js'
import { VIRTUAL_FILE_ID } from './virtualFile/VIRTUAL_FILE_ID.js'
const moduleContent = `export const telefuncFilesGlob = import.meta.glob("/**/*.telefunc.${javaScriptFileExtensionPattern}");`

function virtualFile(): Plugin {
  const resolvedId = '\0' + VIRTUAL_FILE_ID
  return {
    name: 'telefunc:virtualFile',
    resolveId: (id) => (id === VIRTUAL_FILE_ID ? resolvedId : undefined),
    load: (id) => (id === resolvedId ? moduleContent : undefined),
  }
}
