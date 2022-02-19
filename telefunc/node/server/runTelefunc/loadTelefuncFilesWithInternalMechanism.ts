// Mechanism used by Vite/Next/Nuxt plugins for automatically loading `.telefunc.js` files.

export { loadTelefuncFilesWithInternalMechanism }
export { __internal_addTelefunction }

import { TelefuncFiles, Telefunction } from '../types'
import { getGlobalObject } from '../../utils'

// We define `global.__internal_telefuncFiles` to ensure we use the same global object.
// Needed for Next.js. I'm guessing that Next.js is including the `node_modules/` files in a seperate bundle than user files.
const g = getGlobalObject<{ telefuncFiles: TelefuncFiles | null }>('__internal_telefuncFiles', { telefuncFiles: null })

function loadTelefuncFilesWithInternalMechanism() {
  return g.telefuncFiles
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
