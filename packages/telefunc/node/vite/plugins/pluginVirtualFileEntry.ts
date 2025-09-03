export { pluginVirtualFileEntry }

import type { Plugin } from 'vite'
import { assert, escapeRegex, javaScriptFileExtensionPattern } from '../utils.js'
import { VIRTUAL_FILE_ENTRY_ID } from './pluginVirtualFileEntry/VIRTUAL_FILE_ENTRY_ID.js'
const resolvedId = '\0' + VIRTUAL_FILE_ENTRY_ID

const moduleContent = `export const telefuncFilesGlob = import.meta.glob("/**/*.telefunc.${javaScriptFileExtensionPattern}");`

function pluginVirtualFileEntry(): Plugin {
  return {
    name: 'telefunc:pluginVirtualFileEntry',
    resolveId: {
      filter: {
        id: new RegExp(`^${escapeRegex(VIRTUAL_FILE_ENTRY_ID)}$`),
      },
      handler(id) {
        assert(id === VIRTUAL_FILE_ENTRY_ID)
        return resolvedId
      },
    },
    load: {
      filter: {},
      handler(id) {
        assert(id === resolvedId)
        return moduleContent
      },
    },
  }
}
