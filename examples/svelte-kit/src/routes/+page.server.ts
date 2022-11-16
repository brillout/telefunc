import { database } from '$lib/database';

export { load };

const load: import('./$types').PageServerLoad = async () => {
	const { value } = database;
	return {
		value
	};
};
