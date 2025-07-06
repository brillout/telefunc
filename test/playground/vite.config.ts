import telefunc from 'telefunc/vite'
import react from '@vitejs/plugin-react'
import vike from 'vike/plugin'
import type { UserConfig } from 'vite'

export default {
  plugins: [react(), vike(), telefunc()],
  // @ts-expect-error
  vitePluginServerEntry: {
    disableAutoImport: true,
  },
  build: {
    outDir: 'build',
  },
} satisfies UserConfig
