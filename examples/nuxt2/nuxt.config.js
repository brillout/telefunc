import { SERVER_IS_READY } from './SERVER_IS_READY'
import * as bodyParser from 'body-parser'
import { telefunc, provideTelefuncContext } from 'telefunc'
import 'telefunc/async_hooks'

export default {
  modules: ['telefunc/nuxt', sendServerIsReadyMessage],
  telemetry: false,
  serverMiddleware: [
    bodyParser.text(), // Telefunc needs the HTTP request body
    telefuncContextMiddleware,
    telefuncMiddleware
  ]
}

// We provide the Telefunc context for not only for `/_telefunc` but all requests,
// so that the context is available also during SSR.
async function telefuncContextMiddleware(req, _res, next) {
  provideTelefuncContext({ req })
  next?.()
}

async function telefuncMiddleware(req, res, next) {
  const { url, method, body } = req
  if (url !== '/_telefunc') {
    next?.()
    return
  }
  const httpResponse = await telefunc({ url, method, body })
  res.writeHead(httpResponse.statusCode).end(httpResponse.body)
}

// Nuxt uses the logging library `consola` which breaks `libframe/test`'s log listening mechanism;
// we need to log a custom message so that `libframe/test` can know when the build is finished.
function sendServerIsReadyMessage() {
  this.nuxt.hook('build:done', () => {
    process.stdout.write(`${SERVER_IS_READY}\n`)
  })
}
