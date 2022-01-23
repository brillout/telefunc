export { onTelefuncServerError }
export { executeServerErrorListeners }

const serverErrorListeners: ((err: unknown) => void)[] = []

function onTelefuncServerError(listener: (err: unknown) => void) {
  serverErrorListeners.push(listener)
}

function executeServerErrorListeners(err: unknown) {
  serverErrorListeners.forEach((listener) => {
    listener(err)
  })
}
