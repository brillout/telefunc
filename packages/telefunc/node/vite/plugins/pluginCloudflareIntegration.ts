export { pluginCloudflareIntegration }

import type { Plugin, ResolvedConfig } from 'vite'
import { addTelefuncMiddleware } from '../shared/addTelefuncMiddleware.js'

function pluginCloudflareIntegration(): Plugin {
  let config: ResolvedConfig
  let isCloudflareVitePluginDetected = false

  return {
    name: 'telefunc:pluginCloudflareIntegration',
    configResolved: {
      handler(resolvedConfig) {
        config = resolvedConfig

        // Detect if @cloudflare/vite-plugin is being used
        // Check for various possible plugin names from @cloudflare/vite-plugin
        isCloudflareVitePluginDetected = config.plugins.some(plugin => {
          if (!plugin || typeof plugin !== 'object' || !('name' in plugin)) return false
          const name = plugin.name
          return name === 'cloudflare' ||
                 name === 'cloudflare-vite-plugin' ||
                 name === '@cloudflare/vite-plugin' ||
                 (typeof name === 'string' && name.includes('cloudflare'))
        })

        if (isCloudflareVitePluginDetected) {
          console.log('📡 Telefunc: Detected @cloudflare/vite-plugin - enabling Cloudflare Workers integration')
        }
      },
    },
    configureServer: {
      handler(server) {
        if (!isCloudflareVitePluginDetected) return

        // Add Telefunc middleware to the dev server when using Cloudflare Vite plugin
        // This ensures Telefunc works in the Cloudflare Workers development environment
        return () => {
          addTelefuncMiddleware(server.middlewares)
        }
      },
    },
    config: {
      handler(userConfig, { command }) {
        // Only apply configuration during build, not during dev
        // The @cloudflare/vite-plugin handles dev configuration
        if (command !== 'build') return

        // Check if we're likely to be used with @cloudflare/vite-plugin
        // We can't detect it here since plugins aren't resolved yet, but we can
        // provide sensible defaults for Cloudflare Workers environment
        const hasCloudflareConfig = userConfig.plugins?.some(plugin => {
          if (Array.isArray(plugin)) return false
          if (typeof plugin === 'function') return false
          if (!plugin || typeof plugin !== 'object') return false
          return 'name' in plugin && typeof plugin.name === 'string' &&
                 plugin.name.includes('cloudflare')
        })

        if (!hasCloudflareConfig) return

        // Ensure compatibility with Cloudflare Workers environment
        return {
          build: {
            // Cloudflare Workers require ES modules
            target: userConfig.build?.target || 'esnext',
            rollupOptions: {
              ...userConfig.build?.rollupOptions,
              external: [
                // Telefunc should be external in Workers environment
                'telefunc',
                ...(Array.isArray(userConfig.build?.rollupOptions?.external)
                   ? userConfig.build.rollupOptions.external
                   : [])
              ]
            }
          },
          ssr: {
            // Ensure telefunc is treated as external in SSR context for Workers
            external: [
              'telefunc',
              ...(Array.isArray(userConfig.ssr?.external)
                 ? userConfig.ssr.external
                 : [])
            ]
          }
        }
      },
    },
  }
}
