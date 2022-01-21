export default telefuncPlugin

import type { NextConfig } from 'next'
import { install } from '../webpack/install'

function telefuncPlugin(nextConfig: NextConfig = {}): NextConfig {
  return Object.assign({}, nextConfig, {
    webpack: (config, options) => {
      install(config)
      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }
      return config
    },
  } as NextConfig)
}
