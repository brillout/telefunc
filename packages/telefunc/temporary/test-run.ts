import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { telefunc } from '../node/server/telefunc.js'
import { onBefore } from '../node/server/runTelefunc/onBefore.js'
import { config } from '../node/server/serverConfig.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

config.root = __dirname

config.telefuncFiles = [path.join(__dirname, '/test.telefunc.ts')]

onBefore((ctx) => {
  console.log('✅ onBefore ctx.providedContext =', ctx.providedContext)
})

async function run() {
  const body = JSON.stringify({
    file: '/test.telefunc.ts',
    name: 'hello',
    args: ['Mahdi'],
  })

  const res = await telefunc({
    url: '/_telefunc',
    method: 'POST',
    body,
    context: { userId: 1 },
  })

  console.log('RESPONSE  :', res)
}

run()
