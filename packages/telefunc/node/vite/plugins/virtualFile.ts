export { virtualFile }
export { VIRTUAL_MODULE_ID }

import type { Plugin } from 'vite'
import { javaScriptFileExtensionPattern } from '../utils.js'

const VIRTUAL_MODULE_ID = 'virtual:telefunc-files-glob'
const moduleContent = `export const telefuncFilesGlob = import.meta.glob("/**/*.telefunc.${javaScriptFileExtensionPattern}");`

function virtualFile(): Plugin {
  const resolvedId = '\0' + VIRTUAL_MODULE_ID
  return {
    name: 'telefunc:virtualFile',
    resolveId: (id) => (id === VIRTUAL_MODULE_ID ? resolvedId : undefined),
    load: (id) => (id === resolvedId ? moduleContent : undefined),
  }
}
