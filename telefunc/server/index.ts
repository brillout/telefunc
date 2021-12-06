import { assertEnv } from './assertEnv'
export { createTelefuncCaller } from './createTelefuncCaller'
export { getContext, provideContext } from './getContext'
export { Abort } from './Abort'
export {
  __internal_setTelefuncFiles,
  __internal_addTelefunction,
} from './telefunctionsInternallySet'
export { shield } from './shield'

assertEnv()
