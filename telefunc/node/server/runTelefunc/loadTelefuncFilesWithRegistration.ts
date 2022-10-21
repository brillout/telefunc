// Mechanism used by Vite/Next/Nuxt plugins for automatically loading `.telefunc.js` files.

export { loadTelefuncFilesWithRegistration }
export { registerTelefunction }

import { TelefuncFiles, Telefunction } from '../types'
import { getGlobalObject } from '../../utils'

// Using the global scope is needed for Next.js. I'm guessing that Next.js is including the `node_modules/` files in a seperate bundle than user files.
const g = getGlobalObject<{ telefuncFilesLoaded: null | TelefuncFiles }>('loadTelefuncFilesWithRegistration.ts', {
  telefuncFilesLoaded: null
})

function loadTelefuncFilesWithRegistration(): null | TelefuncFiles {
  return g.telefuncFilesLoaded
}

function registerTelefunction(telefunction: Telefunction, exportName: string, telefuncFilePath: string) {
  g.telefuncFilesLoaded = g.telefuncFilesLoaded ?? {}
  g.telefuncFilesLoaded[telefuncFilePath] = {
    ...g.telefuncFilesLoaded[telefuncFilePath],
    [exportName]: telefunction
  }
}
