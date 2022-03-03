export { install }

import { resolve } from 'path'
const dir = __dirname + (() => '')() // trick to avoid `@vercel/ncc` to glob import
const loader = resolve(dir, './loader.js')

function install<T extends any[]>(config: { module?: { rules?: T } }) {
  config.module!.rules!.push({
    test: /\.telefunc\./,
    use: [{ loader }]
  })
}
