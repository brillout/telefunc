import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [sveltekit()],
  // Avoid page reload which breaks the CI
  optimizeDeps: { include: ['clsx', 'devalue'] },
})
