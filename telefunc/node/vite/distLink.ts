export { distLinkOff }
export { distLinkOn }

import { writeFileSync } from 'fs'
import { relative } from 'path'
import type { Plugin } from 'vite'
import { assert } from '../utils'
import { isSSR_config } from './utils'
const telefuncFilesGlobFromDistPath = `${__dirname}/telefuncFilesGlobFromDist.js`

function distLinkOff() {
  writeFileSync(telefuncFilesGlobFromDistPath, ['exports.distLinkOff = true', ''].join('\n'))
}

function distLinkOn(): Plugin {
  let ssr: boolean
  let root: undefined | string
  return {
    name: 'telefunc:distLinkOn',
    apply: 'build',
    configResolved(config) {
      ssr = isSSR_config(config)
      root = config.root ? config.root : process.cwd()
    },
    generateBundle() {
      assert(typeof ssr === 'boolean')
      if (!ssr) {
        return
      }
      assert(root)
      // To `require()` an absolute path doesn't seem to work on Vercel
      const rootRelative = relative(__dirname, root)
      writeFileSync(
        telefuncFilesGlobFromDistPath,
        [
          `const { telefuncFilesGlob } = require('${rootRelative}/dist/server/telefuncFilesGlob.js');`,
          `exports.telefuncFilesGlob = telefuncFilesGlob;`,
          '',
        ].join('\n'),
      )
    },
  } as Plugin
}
