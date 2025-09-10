import { describe, it, expect, vi } from 'vitest'
import { pluginCloudflareIntegration } from './pluginCloudflareIntegration.js'
import type { Plugin, ResolvedConfig } from 'vite'

describe('pluginCloudflareIntegration', () => {
  it('should create a plugin with correct name', () => {
    const plugin = pluginCloudflareIntegration() as Plugin
    expect(plugin.name).toBe('telefunc:pluginCloudflareIntegration')
  })

  it('should detect Cloudflare Vite plugin', () => {
    const plugin = pluginCloudflareIntegration() as Plugin
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    const mockConfig: ResolvedConfig = {
      plugins: [
        { name: 'cloudflare' },
        { name: 'telefunc:pluginCommon' }
      ]
    } as any

    if (plugin.configResolved && typeof plugin.configResolved === 'object' && 'handler' in plugin.configResolved) {
      plugin.configResolved.handler(mockConfig)
    }

    expect(consoleSpy).toHaveBeenCalledWith(
      '📡 Telefunc: Detected @cloudflare/vite-plugin - enabling Cloudflare Workers integration'
    )

    consoleSpy.mockRestore()
  })

  it('should not detect when Cloudflare plugin is not present', () => {
    const plugin = pluginCloudflareIntegration() as Plugin
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    const mockConfig: ResolvedConfig = {
      plugins: [
        { name: 'vite:react' },
        { name: 'telefunc:pluginCommon' }
      ]
    } as any

    if (plugin.configResolved && typeof plugin.configResolved === 'object' && 'handler' in plugin.configResolved) {
      plugin.configResolved.handler(mockConfig)
    }

    expect(consoleSpy).not.toHaveBeenCalled()

    consoleSpy.mockRestore()
  })

  it('should provide build configuration for Cloudflare environment', () => {
    const plugin = pluginCloudflareIntegration() as Plugin

    const userConfig = {
      plugins: [{ name: 'cloudflare' }],
      build: {},
      ssr: {}
    }

    if (plugin.config && typeof plugin.config === 'object' && 'handler' in plugin.config) {
      const result = plugin.config.handler(userConfig, { command: 'build' })
      
      expect(result).toEqual({
        build: {
          target: 'esnext',
          rollupOptions: {
            external: ['telefunc']
          }
        },
        ssr: {
          external: ['telefunc']
        }
      })
    }
  })

  it('should not provide configuration during dev command', () => {
    const plugin = pluginCloudflareIntegration() as Plugin

    const userConfig = {
      plugins: [{ name: 'cloudflare' }]
    }

    if (plugin.config && typeof plugin.config === 'object' && 'handler' in plugin.config) {
      const result = plugin.config.handler(userConfig, { command: 'serve' })
      expect(result).toBeUndefined()
    }
  })
})
