export { onBug }
export { callBugListeners }

const bugListeners: ((err: unknown) => void)[] = []

function onBug(listener: (err: unknown) => void) {
  bugListeners.push(listener)
}

function callBugListeners(err: unknown) {
  bugListeners.forEach((listener) => {
    listener(err)
  })
}
