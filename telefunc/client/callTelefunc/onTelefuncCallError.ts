export { onTelefuncCallError }
export { executeTelefuncCallErrorListeners }

import type { TelefuncCallError } from './makeHttpRequest'

const telefuncCallErrorListeners: ((err: TelefuncCallError) => void)[] = []

function onTelefuncCallError(listener: (err: TelefuncCallError) => void) {
  telefuncCallErrorListeners.push(listener)
}

function executeTelefuncCallErrorListeners(err: TelefuncCallError) {
  telefuncCallErrorListeners.forEach((listener) => {
    listener(err)
  })
}
