export { onTelefunctionCallError }
export { executeCallErrorListeners }

import type { TelefuncCallError } from './makeHttpRequest'

const telefuncCallErrorListeners: ((err: TelefuncCallError) => void)[] = []

function onTelefunctionCallError(listener: (err: TelefuncCallError) => void) {
  telefuncCallErrorListeners.push(listener)
}

function executeCallErrorListeners(err: TelefuncCallError) {
  telefuncCallErrorListeners.forEach((listener) => {
    listener(err)
  })
}
