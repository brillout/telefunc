import type { NextConfig } from 'next'
import { WebpackCompiler } from 'unplugin'

export default plugin

function plugin(nextConfig: NextConfig = {}): NextConfig {
  return Object.assign({}, nextConfig, {
    webpack: (config, options) => {
      // console.log(options.config.compress)

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }
      return config
    },
  } as NextConfig)
}
