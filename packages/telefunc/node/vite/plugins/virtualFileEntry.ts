export { virtualFileEntry }

import type { Plugin } from 'vite'
import { javaScriptFileExtensionPattern } from '../utils.js'
import { VIRTUAL_FILE_ID } from './virtualFileEntry/VIRTUAL_FILE_ID.js'

const moduleContent = `export const telefuncFilesGlob = import.meta.glob("/**/*.telefunc.${javaScriptFileExtensionPattern}");`

function virtualFileEntry(): Plugin {
  const resolvedId = '\0' + VIRTUAL_FILE_ID
  return {
    name: 'telefunc:virtualFileEntry',
    resolveId: (id) => (id === VIRTUAL_FILE_ID ? resolvedId : undefined),
    load: (id) => (id === resolvedId ? moduleContent : undefined),
  }
}
