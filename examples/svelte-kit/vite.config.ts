import { sveltekit } from '@sveltejs/kit/vite'
import type { UserConfig } from 'vite'
import { telefunc } from 'telefunc/vite'

const config: UserConfig = {
  plugins: [
    // FIXME: telefunc dev server middleware conflicts with sveltekit `src/routes/_telefunc/+server.ts`
    telefunc().filter((p: any) => p.name !== 'vite-plugin-ssr:devConfig:serverMiddleware'),
    sveltekit()
  ]
}

export default config
