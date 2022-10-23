export { install }

import { resolve } from 'path'
import { logResult } from '../server/shield/codegen/generateShield'
import { getRoot } from './getInfo'
import type { Compiler } from './types'
const dir = __dirname + (() => '')() // trick to avoid `@vercel/ncc` to glob import
const loader = resolve(dir, './loader.js')

function install<T extends any[]>(config: { module?: { rules?: T }; plugins?: any }, logSuccessPrefix?: string) {
  config.module!.rules!.push({
    test: /\.telefunc\./,
    use: [{ loader }]
  })
  if (logSuccessPrefix) {
    // Possible altenertive: use `process.on('exit', () => { /*...*/ })`
    //  - `afterEmitPlugin()` logs at the right time and fits well Next.js's build logs, but it may not fit the build logs of other stacks.
    //  - Reliable exit callback: https://stackoverflow.com/questions/14031763/doing-a-cleanup-action-just-before-node-js-exits/49392671#49392671
    config.plugins.push(afterEmitPlugin(logSuccessPrefix))
  }
}

function afterEmitPlugin(logSuccessPrefix: string) {
  return {
    apply: (compiler: Compiler) => {
      compiler.hooks.afterEmit.tap('AfterEmitPlugin', (_compilation: any) => {
        const root = getRoot(compiler)
        logResult(root, logSuccessPrefix, null)
      })
    }
  }
}
