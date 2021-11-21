import type { Module } from '@nuxt/types'
import { resolve } from 'path'
import { _telefunc } from './_telefunc'

const _telefuncModule: Module = function telefuncModule() {

  this.extendBuild((config) => {
    config.module!.rules.push({
      test: /\.telefunc\./,
      use: [{ loader: resolve(__dirname, './loader.js') }],
    })
  })

  this.addServerMiddleware(_telefunc)
}

export default _telefuncModule

module.exports.meta = require('../../../../package.json')
