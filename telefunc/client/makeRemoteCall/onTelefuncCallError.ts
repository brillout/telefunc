export { onTelefuncCallError }
export { callTelefuncCallErrorListeners }

import type { TelefuncCallError } from './makeHttpRequest'

const telefuncCallErrorListeners: ((err: TelefuncCallError) => void)[] = []

function onTelefuncCallError(listener: (err: TelefuncCallError) => void) {
  telefuncCallErrorListeners.push(listener)
}

function callTelefuncCallErrorListeners(err: TelefuncCallError) {
  telefuncCallErrorListeners.forEach((listener) => {
    listener(err)
  })
}
