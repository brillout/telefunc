import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import { telefunc } from 'telefunc/vite';

const config: UserConfig = {
	plugins: [sveltekit(), telefunc()]
};

export default config;
