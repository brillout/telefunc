export { onTelefunctionError }
export { callTelefunctionErrorListeners }

const telefuncCallErrorListeners: ((err: unknown) => void)[] = []

function onTelefunctionError(listener: (err: unknown) => void) {
  telefuncCallErrorListeners.push(listener)
}

function callTelefunctionErrorListeners(err: unknown) {
  telefuncCallErrorListeners.forEach((listener) => {
    listener(err)
  })
}
