import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import { telefunc } from 'telefunc/vite'

export default defineConfig({
  plugins: [sveltekit(), telefunc()],

  // [Telefunc CI] Avoid hard page reload upon Vite discovering new dependencies to optimize: hard reloads cause random browser errors breaking the CI.
  optimizeDeps: { include: ['clsx', 'devalue'] },

  // [Telefunc CI] Test robust loading of telefunctions.
  // @ts-expect-error
  vitePluginServerEntry: {
    disableAutoImport: true,
  },
})
