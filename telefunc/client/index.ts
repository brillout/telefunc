import { config } from './clientConfig.js'
export { config }
export { config as telefuncConfig }
export { onAbort, onTelefunctionRemoteCallError } from './remoteTelefunctionCall/onAbort'
export type { TelefunctionError } from './TelefunctionError'

export { remoteTelefunctionCall as __remoteTelefunctionCall } from './remoteTelefunctionCall'
