export { onAbort }
export { callOnAbortListeners }
export { onTelefunctionRemoteCallError }

import type { TelefunctionError, TelefunctionCallAbort } from '../TelefunctionError.js'
import { assertWarning } from '../../utils/assert.js'

type Listener = (err: TelefunctionCallAbort) => void

/** Outdated: use onAbort() instead */
function onTelefunctionRemoteCallError(listener: (err: TelefunctionError) => void) {
  assertWarning(false, 'onTelefunctionRemoteCallError() deprecated in favor of onAbort()', {
    onlyOnce: true,
    showStackTrace: true,
  })
  onAbort(listener)
}

function onAbort(listener: Listener) {
  window.__telefunc_errorListeners = window.__telefunc_errorListeners || []
  window.__telefunc_errorListeners.push(listener)
}

function callOnAbortListeners(err: TelefunctionCallAbort) {
  ;(window.__telefunc_errorListeners || []).forEach((listener) => {
    listener(err)
  })
}

declare global {
  interface Window {
    __telefunc_errorListeners: Listener[]
  }
}
