import type { Module } from '@nuxt/types'
import * as bodyParser from 'body-parser'
import { resolve } from 'path'
import { _telefunc } from './_telefunc'

const _telefuncModule: Module = function telefuncModule() {

  this.extendBuild((config) => {
    config.module!.rules.push({
      test: /\.telefunc\./,
      use: [{ loader: resolve(__dirname, './loader.js') }],
    })
  })

  this.addServerMiddleware(bodyParser.text())
  this.addServerMiddleware(_telefunc)
}

export default _telefuncModule

// nuxt suggests exporting package.json for plugins 
module.exports.meta = require('../../../../package.json')
