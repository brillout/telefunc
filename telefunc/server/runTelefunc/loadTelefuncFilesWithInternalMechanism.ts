// Mechanism used by Vite/Next/Nuxt plugins for automatically loading `.telefunc.js` files.

export { loadTelefuncFilesWithInternalMechanism }
export { __internal_setTelefuncFiles }
export { __internal_addTelefunction }

import { TelefuncFiles, Telefunction } from '../types'
import { assert } from '../utils'

const key = '__internal_telefuncFiles'
const globalHolder: { telefuncFiles: TelefuncFiles | null } = getGlobalHolder()

function loadTelefuncFilesWithInternalMechanism() {
  return globalHolder.telefuncFiles
}

function __internal_setTelefuncFiles(telefuncFiles: TelefuncFiles) {
  assert(globalHolder.telefuncFiles === null)
  globalHolder.telefuncFiles = telefuncFiles
}

function __internal_addTelefunction(telefunctionName: string, telefunction: Telefunction, telefuncFilePath: string) {
  globalHolder.telefuncFiles = globalHolder.telefuncFiles || {}
  globalHolder.telefuncFiles[telefuncFilePath] = {
    ...globalHolder.telefuncFiles[telefuncFilePath],
    [telefunctionName]: telefunction,
  }
}

function getGlobalHolder(): { telefuncFiles: TelefuncFiles | null } {
  if (typeof global === 'undefined') {
    return { telefuncFiles: null }
  }
  return (global[key] = global[key] || { telefuncFiles: null })
}
declare global {
  namespace NodeJS {
    interface Global {
      [key]?: { telefuncFiles: TelefuncFiles | null }
    }
  }
}
