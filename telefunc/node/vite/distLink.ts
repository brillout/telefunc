export { distLinkOff }
export { distLinkOn }

import { writeFileSync } from 'fs'
import { posix } from 'path'
import type { Plugin } from 'vite'
import { assert, toPosixPath } from '../utils'
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
      root = config.root ? toPosixPath(config.root) : toPosixPath(process.cwd())
    },
    generateBundle() {
      assert(typeof ssr === 'boolean')
      if (!ssr) {
        return
      }
      assert(root)
      // To `require()` an absolute path doesn't seem to work on Vercel
      const rootRelative = posix.relative(toPosixPath(__dirname), root)
      console.error('rr', rootRelative)
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
