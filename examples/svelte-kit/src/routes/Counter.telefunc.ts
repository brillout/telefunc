// This file is never loaded in the browser

import { database } from '$lib/database';

// onCounterIncrement() is called from the browser but always exectued on the server
export { onCounterIncrement };

// Telefunc guarantees that `diff` is a `number` at runtime, see https://telefunc.com/shield#typescript-automatic
async function onCounterIncrement(diff: number) {
	// We can use telefunctions to directly access our database from our frontend
	database.value = database.value + diff;
	return database.value;
}
