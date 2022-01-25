export { onTelefunctionRemoteCallError }
export { executeCallErrorListeners }

import type { TelefunctionError } from '../TelefunctionError'

const remoteCallErrorListeners: ((err: TelefunctionError) => void)[] = []

function onTelefunctionRemoteCallError(listener: (err: TelefunctionError) => void) {
  remoteCallErrorListeners.push(listener)
}

function executeCallErrorListeners(err: TelefunctionError) {
  remoteCallErrorListeners.forEach((listener) => {
    listener(err)
  })
}
