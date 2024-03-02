import { telefunc } from 'telefunc/vite'
import type { UserConfig } from 'vite'

const port = 3000

export default {
  plugins: [
    // @ts-expect-error
    telefunc({
      disableNamingConvention: true,
    }),
  ],
  build: { target: 'esnext' },
  appType: 'mpa',
  server: { port, host: true },
  preview: { port },
} as UserConfig
