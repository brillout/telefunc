export { install }

import type { Configuration } from 'webpack'
import { resolve } from 'path'
const loader = resolve(__dirname, './loader.js')

function install(config: Configuration) {
  config.module!.rules!.push({
    test: /\.telefunc\./,
    use: [{ loader }],
  })
}
