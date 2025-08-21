export { virtualModule }

import type { Plugin } from 'vite'
import { javaScriptFileExtensionPattern } from '../utils.js'

const VIRTUAL_MODULE_ID = 'virtual:telefunc-files-glob'

function virtualModule(): Plugin {
  const resolvedId = '\0' + VIRTUAL_MODULE_ID
  const importGlobPattern = `import.meta.glob("/**/*.telefunc.${javaScriptFileExtensionPattern}")`
  const moduleContent = `export const telefuncFilesGlob = ${importGlobPattern};`

  return {
    name: 'telefunc:virtualModule',
    resolveId: (id) => (id === VIRTUAL_MODULE_ID ? resolvedId : undefined),
    load: (id) => (id === resolvedId ? moduleContent : undefined),
  }
}
