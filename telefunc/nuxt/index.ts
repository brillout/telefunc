import type { Module } from '@nuxt/types'
import { resolve } from 'path'

const telefuncModule: Module = function () {
  this.extendBuild((config) => {
    const loader = resolve(__dirname, './loader.js')
    config.module!.rules.push({
      test: /\.telefunc\./,
      use: [{ loader }],
    })
  })
}

export default telefuncModule

// It's Nuxt's official recommendation to export the entire package.json
module.exports.meta = require('../../../../package.json')
