export { addTelefuncMiddleware }

import { telefunc } from '../../server/index.js'
import type { ViteDevServer } from 'vite'
import type { IncomingMessage, ServerResponse } from 'node:http'

type ConnectServer = ViteDevServer['middlewares']
function addTelefuncMiddleware(middlewares: ConnectServer) {
  middlewares.use((req, res, next) => {
    if (res.headersSent) return next()

    const url = req.originalUrl || req.url
    if (!url) return next()

    if (url !== '/_telefunc') return next()

    if ((req.headers['content-type'] || '').includes('multipart/form-data')) {
      return handleMultipart(req, res, url)
    }

    // https://stackoverflow.com/questions/12497358/handling-text-plain-in-express-via-connect/12497793#12497793
    // Alternative: https://www.npmjs.com/package/raw-body
    let body = ''
    let bodyPromiseResolve: () => void
    let bodyPromise = new Promise((r) => (bodyPromiseResolve = () => r(undefined)))
    req.setEncoding('utf8')
    req.on('data', function (chunk) {
      body += chunk
    })
    req.on('end', () => {
      bodyPromiseResolve()
    })

    bodyPromise.then(async () => {
      const httpResponse = await telefunc({ url, method: req.method!, body })

      res.setHeader('Content-Type', httpResponse.contentType)
      res.statusCode = httpResponse.statusCode
      res.end(httpResponse.body)
    })
  })
}

function handleMultipart(req: IncomingMessage, res: ServerResponse, url: string) {
  const chunks: Buffer[] = []
  let bodyPromiseResolve: () => void
  let bodyPromise = new Promise((r) => (bodyPromiseResolve = () => r(undefined)))
  req.on('data', (chunk: Buffer) => {
    chunks.push(chunk)
  })
  req.on('end', () => {
    bodyPromiseResolve()
  })

  bodyPromise.then(async () => {
    const buffer = Buffer.concat(chunks)
    const webRequest = new Request('http://localhost', {
      method: 'POST',
      headers: req.headers as Record<string, string>,
      body: buffer,
    })
    const formData = await webRequest.formData()

    const httpResponse = await telefunc({ url, method: req.method!, body: formData })

    res.setHeader('Content-Type', httpResponse.contentType)
    res.statusCode = httpResponse.statusCode
    res.end(httpResponse.body)
  })
}
