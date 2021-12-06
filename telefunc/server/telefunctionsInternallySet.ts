import { TelefuncFiles, Telefunction } from './types'
import { assert } from './utils'

export { __internal_setTelefuncFiles }
export { __internal_addTelefunction }
export { telefuncInternallySet }

let telefuncInternallySet: TelefuncFiles | null = null
function __internal_setTelefuncFiles(telefuncFiles: TelefuncFiles) {
  assert(telefuncInternallySet === null)
  telefuncInternallySet = telefuncFiles
}
// TODO: use __internal_setTelefuncFiles instead
function __internal_addTelefunction(telefunctionName: string, telefunction: Telefunction, filePath: string) {
  telefuncInternallySet = telefuncInternallySet || {}
  telefuncInternallySet[filePath] = { ...telefuncInternallySet[filePath], [telefunctionName]: telefunction }
}
