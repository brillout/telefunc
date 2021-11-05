import type { NextConfig } from 'next'

export default plugin

function plugin(): NextConfig {
  return {
    webpack: (config: NextConfig, { dev, isServer, dir, config: resolvedConfig, defaultLoaders }) => {
      console.log(config, dev, isServer, dir)

      return config
    },
  }
}
