export default telefuncPlugin

import type { NextConfig } from 'next'
import pc from 'picocolors'
import { install } from '../webpack/install'

function telefuncPlugin(nextConfig: NextConfig = {}) {
  return Object.assign({}, nextConfig, {
    webpack: (config, options) => {
      install(config, `${pc.green(pc.bold(' ✓'))}`)
      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }
      return config
    },
  } as NextConfig)
}
