export { onRemoteCallError }
export { executeCallErrorListeners }

import type { RemoteCallError } from './makeHttpRequest'

const remoteCallErrorListeners: ((err: RemoteCallError) => void)[] = []

function onRemoteCallError(listener: (err: RemoteCallError) => void) {
  remoteCallErrorListeners.push(listener)
}

function executeCallErrorListeners(err: RemoteCallError) {
  remoteCallErrorListeners.forEach((listener) => {
    listener(err)
  })
}
