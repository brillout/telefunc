export { virtualModule }

import type { Plugin } from 'vite'
import { VIRTUAL_MODULE_ID, getVirtualModuleContent } from '../importGlob/toggle.js'

function virtualModule(): Plugin {
  const RESOLVED_VIRTUAL_MODULE_ID = '\0' + VIRTUAL_MODULE_ID

  return {
    name: 'telefunc:virtualModule',
    resolveId(id) {
      if (id === VIRTUAL_MODULE_ID) {
        return RESOLVED_VIRTUAL_MODULE_ID
      }
    },
    load(id) {
      if (id === RESOLVED_VIRTUAL_MODULE_ID) {
        return getVirtualModuleContent()
      }
    },
  }
}
