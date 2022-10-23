export default telefuncPlugin

import type { NextConfig } from 'next'
import { install } from '../webpack/install'
import pc from 'picocolors'

function telefuncPlugin(nextConfig: NextConfig = {}) {
  return Object.assign({}, nextConfig, {
    webpack: (config, options) => {
      install(config, `${pc.cyan('info')}  -`)
      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }
      return config
    }
  } as NextConfig)
}
