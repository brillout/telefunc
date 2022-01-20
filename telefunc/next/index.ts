export default plugin

import type { NextConfig } from 'next'
import { resolve } from 'path'
const telefuncLoader = resolve(__dirname, './telefuncLoader.js')

function plugin(nextConfig: NextConfig = {}): NextConfig {
  return Object.assign({}, nextConfig, {
    webpack: (config, options) => {
      config.module.rules.push({
        test: /\.telefunc\./,
        use: [{ loader: telefuncLoader }],
      })
      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }
      return config
    },
  } as NextConfig)
}
