import type { Module } from '@nuxt/types'
import * as bodyParser from 'body-parser'
import { resolve } from 'path'
import { telefuncMiddleware } from './telefuncMiddleware'

const telefuncModule: Module = function () {

  this.extendBuild((config) => {
    const loader = resolve(__dirname, './loader.js')
    config.module!.rules.push({
      test: /\.telefunc\./,
      use: [{ loader }],
    })
  })

  this.addServerMiddleware(bodyParser.text())
  this.addServerMiddleware(telefuncMiddleware)
}

export default telefuncModule

// Nuxt suggests exporting package.json for plugins
module.exports.meta = require('../../../../package.json')
