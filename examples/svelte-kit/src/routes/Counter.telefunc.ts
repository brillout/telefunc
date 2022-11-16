import { database } from '$lib/database';

export { onCounterIncrement };

// Telefunc ensures that `diff` is a `number` at runtime, see https://telefunc.com/shield#typescript
async function onCounterIncrement(diff: number) {
	database.value = database.value + diff;
	return database.value;
}
