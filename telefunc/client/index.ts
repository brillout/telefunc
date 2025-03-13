import { config } from './clientConfig.js'
export { config }
export { config as telefuncConfig }
export { onAbort, onTelefunctionRemoteCallError } from './remoteTelefunctionCall/onAbort.js'
export type { TelefunctionError } from './TelefunctionError.js'

export { remoteTelefunctionCall as __remoteTelefunctionCall } from './remoteTelefunctionCall.js'
