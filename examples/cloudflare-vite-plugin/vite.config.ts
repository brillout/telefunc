import { defineConfig } from 'vite'
import { cloudflare } from '@cloudflare/vite-plugin'
import { telefunc } from 'telefunc/vite'

export default defineConfig({
  plugins: [
    // Cloudflare Vite plugin for Workers runtime integration
    cloudflare({
      // Configure your Worker entry point
      entry: './src/worker.ts',
      // Enable development mode with workerd
      dev: {
        // Use workerd for development (matches production environment)
        runtime: 'workerd'
      }
    }),
    // Telefunc plugin for RPC functionality
    telefunc()
  ],
  build: {
    // Cloudflare Workers require ES modules
    target: 'esnext'
  }
})
