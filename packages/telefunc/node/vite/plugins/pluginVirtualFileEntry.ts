export { pluginVirtualFileEntry }

import type { Plugin } from 'vite'
import { javaScriptFileExtensionPattern } from '../utils.js'
import { VIRTUAL_FILE_ENTRY_ID } from './pluginVirtualFileEntry/VIRTUAL_FILE_ENTRY_ID.js'

const moduleContent = `export const telefuncFilesGlob = import.meta.glob("/**/*.telefunc.${javaScriptFileExtensionPattern}");`

function pluginVirtualFileEntry(): Plugin {
  const resolvedId = '\0' + VIRTUAL_FILE_ENTRY_ID
  return {
    name: 'telefunc:pluginVirtualFileEntry',
    resolveId: {
    handler(id) {
      return id === VIRTUAL_FILE_ENTRY_ID ? resolvedId : undefined
    }
    },
    load: {
    handler(id) {
      return id === resolvedId ? moduleContent : undefined
    }
    },
  }
}
