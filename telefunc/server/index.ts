import { assertEnv } from './assertEnv'

export { createTelefuncCaller } from './createTelefuncCaller'
export { getContext, provideContext } from './getContext'
export { Abort } from './Abort'
export { shield, withShield } from './shield'

export {
  __internal_setTelefuncFiles,
  __internal_addTelefunction,
} from './telefunctionsInternallySet'

assertEnv()
