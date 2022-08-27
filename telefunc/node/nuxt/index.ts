import type { Module } from '@nuxt/types'
import { install } from '../webpack/install'

const telefuncModule: Module = function () {
  this.extendBuild((config) => {
    install(config)
  })
}

export default telefuncModule

// It's Nuxt's official recommendation to export the entire package.json
module.exports.meta = require('../../../../package.json')
