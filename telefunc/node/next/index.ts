export default telefuncPlugin

import type { NextConfig } from 'next'
import { install } from '../webpack/install.js'
import pc from '@brillout/picocolors'

// We don't use the type `NextConfig` to avoid version mismatches
function telefuncPlugin<T>(nextConfig: T): T {
  return Object.assign({}, nextConfig, {
    webpack: (config, options) => {
      install(config, `${pc.green(pc.bold(' ✓'))}`)
      const nextConfig_ = nextConfig as NextConfig
      if (typeof nextConfig_.webpack === 'function') {
        return nextConfig_.webpack(config, options)
      }
      return config
    },
  } as NextConfig)
}
