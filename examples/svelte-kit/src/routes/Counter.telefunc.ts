import { database } from '$lib/database'

export { onCounterIncrement }

async function onCounterIncrement(diff: number) {
  database.value = database.value + diff
  return database.value
}
