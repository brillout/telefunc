export { install }

import { resolve } from 'path'
const loader = resolve(__dirname, './loader.js')

function install<T extends any[]>(config: { module?: { rules?: T } }) {
  config.module!.rules!.push({
    test: /\.telefunc\./,
    use: [{ loader }],
  })
}
