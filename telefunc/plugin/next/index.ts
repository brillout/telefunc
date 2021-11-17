import type { NextConfig } from 'next'
import { resolve } from 'path'

export default plugin

function plugin(nextConfig: NextConfig = {}): NextConfig {
  return Object.assign({}, nextConfig, {
    webpack: (config, options) => {
      config.module.rules.push({
        test: /\.telefunc\./,
        use: [{ loader: resolve(__dirname, './loader.js') }],
      })

      config.module.rules.push({
        test: /api\/_telefunc/,
        use: [{ loader: resolve(__dirname, './loader.js') }],
      })

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }
      return config
    },
  } as NextConfig)
}
