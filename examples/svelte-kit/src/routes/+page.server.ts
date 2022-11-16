import { database } from '$lib/database';

export { load };

// For the page's initial data, we use SvelteKit instead of Telefunc; see https://telefunc.com/svelte-kit#initial-page-data
const load: import('./$types').PageServerLoad = async () => {
	const { value } = database;
	return {
		value
	};
};
