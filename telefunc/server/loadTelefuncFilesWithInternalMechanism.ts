// Mechanism used by Vite/Next/Nuxt plugins for telefunc files auto-loading.

import { TelefuncFiles, Telefunction } from './types'
import { assert } from './utils'

export { __internal_setTelefuncFiles }
export { __internal_addTelefunction }
export { loadTelefuncFilesWithInternalMechanism }

function loadTelefuncFilesWithInternalMechanism() {
  return telefuncInternallySet
}

let telefuncInternallySet: TelefuncFiles | null = null
function __internal_setTelefuncFiles(telefuncFiles: TelefuncFiles) {
  assert(telefuncInternallySet === null)
  telefuncInternallySet = telefuncFiles
}
function __internal_addTelefunction(telefunctionName: string, telefunction: Telefunction, telefuncFilePath: string) {
  telefuncInternallySet = telefuncInternallySet || {}
  telefuncInternallySet[telefuncFilePath] = {
    ...telefuncInternallySet[telefuncFilePath],
    [telefunctionName]: telefunction,
  }
}
