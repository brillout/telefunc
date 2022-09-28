export { onTelefunctionRemoteCallError }
export { executeCallErrorListeners }

import type { TelefunctionError } from '../TelefunctionError'

type Listener = (err: TelefunctionError) => void

function onTelefunctionRemoteCallError(listener: Listener) {
  window.__telefunc_errorListeners = window.__telefunc_errorListeners || []
  window.__telefunc_errorListeners.push(listener)
}

function executeCallErrorListeners(err: TelefunctionError) {
  ;(window.__telefunc_errorListeners || []).forEach((listener) => {
    listener(err)
  })
}

declare global {
  interface Window {
    __telefunc_errorListeners: Listener[]
  }
}
