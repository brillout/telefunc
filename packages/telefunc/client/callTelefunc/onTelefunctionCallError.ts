export { onTelefunctionCallError }
export { executeCallErrorListeners }

import type { TelefunctionCallError } from './makeHttpRequest'

const telefuncCallErrorListeners: ((err: TelefunctionCallError) => void)[] = []

function onTelefunctionCallError(listener: (err: TelefunctionCallError) => void) {
  telefuncCallErrorListeners.push(listener)
}

function executeCallErrorListeners(err: TelefunctionCallError) {
  telefuncCallErrorListeners.forEach((listener) => {
    listener(err)
  })
}
