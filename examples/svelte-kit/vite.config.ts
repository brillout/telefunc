import { sveltekit } from '@sveltejs/kit/vite'
import type { UserConfig } from 'vite'
import { telefunc } from 'telefunc/vite'

const port = 3000

const config: UserConfig = {
  plugins: [
    telefunc(),
    sveltekit()
  ],
  build: { target: 'esnext' },
  server: { port, host: true },
  preview: { port }
}

export default config
