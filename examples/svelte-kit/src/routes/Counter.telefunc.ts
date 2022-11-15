import { database } from '$lib/database'

export { onCounterIncrement }

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
