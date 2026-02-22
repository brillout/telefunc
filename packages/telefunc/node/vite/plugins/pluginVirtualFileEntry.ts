export { pluginVirtualFileEntry }

import type { Plugin } from 'vite'
import { assert } from '../../../utils/assert.js'
import { escapeRegex } from '../../../utils/escapeRegex.js'
import { javaScriptFileExtensionPattern } from '../../../utils/isScriptFile.js'
import { VIRTUAL_FILE_ENTRY_ID } from './pluginVirtualFileEntry/VIRTUAL_FILE_ENTRY_ID.js'
const moduleContent = `export const telefuncFilesGlob = import.meta.glob("/**/*.telefunc.${javaScriptFileExtensionPattern}");`
const resolvedId = '\0' + VIRTUAL_FILE_ENTRY_ID

function pluginVirtualFileEntry(): Plugin[] {
  return [
    {
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
        filter: {
          /* I don't know why this doesn't work:
        id: resolvedId,
        */
          id: new RegExp(`^${escapeRegex(resolvedId)}$`),
        },
        handler(id) {
          return id === resolvedId ? moduleContent : undefined
        },
      },
    },
  ]
}
