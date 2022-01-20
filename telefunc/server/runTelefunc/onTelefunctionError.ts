export { onTelefunctionError }
export { executeTelefunctionErrorListeners }

const telefuncCallErrorListeners: ((err: unknown) => void)[] = []

function onTelefunctionError(listener: (err: unknown) => void) {
  telefuncCallErrorListeners.push(listener)
}

function executeTelefunctionErrorListeners(err: unknown) {
  telefuncCallErrorListeners.forEach((listener) => {
    listener(err)
  })
}
