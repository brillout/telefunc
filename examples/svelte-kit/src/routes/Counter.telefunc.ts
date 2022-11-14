import { getContext } from 'telefunc'

export { onLoadData }
export { onCounterIncrement }

const database = {
  value: 42
}

async function onLoadData() {
  const { user } = getContext()
  const { value } = database
  return {
    user,
    value
  }
}

async function onCounterIncrement(action: string) {
  if (action === 'inc') {
    database.value++
  } else if (action === 'dec') {
    database.value--
  } else {
    throw new Error(`Invalid action ${action}`)
  }
  const { value } = database
  return { value }
}
