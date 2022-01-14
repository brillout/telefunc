import { assertEnv } from './assertEnv'

export { createTelefuncCaller } from './createTelefuncCaller'
export { callTelefunc } from './callTelefunc'
export { getContext, provideContext } from './getContext'
export { Abort } from './Abort'
export { shield, withShield } from './shield'

// In order to allow users to override `Telefunc.Context`, we need to export `Telefunc` (even if the user never imports `Telefunc`)
export type { Telefunc } from './getContext/TelefuncNamespace'

export {
  __internal_setTelefuncFiles,
  __internal_addTelefunction,
} from './callTelefunc/loadTelefuncFilesWithInternalMechanism'

assertEnv()
