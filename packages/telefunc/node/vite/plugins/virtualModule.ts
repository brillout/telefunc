export { virtualModule }

import type { Plugin } from 'vite'
import { VIRTUAL_MODULE_ID, getVirtualModuleContent } from '../importGlob/toggle.js'

function virtualModule(): Plugin {
  const resolvedId = '\0' + VIRTUAL_MODULE_ID

  return {
    name: 'telefunc:virtualModule',
    resolveId: (id) => (id === VIRTUAL_MODULE_ID ? resolvedId : undefined),
    load: (id) => (id === resolvedId ? getVirtualModuleContent() : undefined),
  }
}
