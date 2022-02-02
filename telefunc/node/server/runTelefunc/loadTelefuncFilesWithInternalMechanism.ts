// Mechanism used by Vite/Next/Nuxt plugins for automatically loading `.telefunc.js` files.

export { loadTelefuncFilesWithInternalMechanism }
export { __internal_setTelefuncFiles }
export { __internal_addTelefunction }

import { TelefuncFiles, Telefunction } from '../types'
import { assert, getGlobalObject } from '../../utils'

const g = getGlobalObject<{ telefuncFiles: TelefuncFiles | null }>('__internal_telefuncFiles', { telefuncFiles: null })

function loadTelefuncFilesWithInternalMechanism() {
  return g.telefuncFiles
}

function __internal_setTelefuncFiles(telefuncFiles: TelefuncFiles) {
  assert(g.telefuncFiles === null)
  g.telefuncFiles = telefuncFiles
}

function __internal_addTelefunction(
  telefunction: Telefunction,
  telefunctionFileExport: string,
  telefuncFilePath: string,
) {
  g.telefuncFiles = g.telefuncFiles || {}
  g.telefuncFiles[telefuncFilePath] = {
    ...g.telefuncFiles[telefuncFilePath],
    [telefunctionFileExport]: telefunction,
  }
}
