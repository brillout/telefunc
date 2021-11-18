import { assertEnv } from './assertEnv'
export { createTelefuncCaller } from './createTelefuncCaller'
export { getContext, provideContext } from './getContext'
export { Abort } from './Abort'
export {
  setTelefuncFiles as __internal_setTelefuncFiles,
  addTelefunction as __internal_addTelefunction,
} from './callTelefunc'
export { shield } from './shield'

assertEnv()
