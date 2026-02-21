export { addTelefuncMiddleware }

import { telefunc } from '../../server/index.js'
import type { ViteDevServer } from 'vite'

type ConnectServer = ViteDevServer['middlewares']
function addTelefuncMiddleware(middlewares: ConnectServer) {
  middlewares.use(async (req, res, next) => {
    if (res.headersSent) return next()

    const url = req.originalUrl || req.url
    if (!url) return next()

    if (url !== '/_telefunc') return next()

    const body = new ReadableStream({
      start(controller) {
        req.on('data', (chunk: Buffer) => controller.enqueue(new Uint8Array(chunk)))
        req.on('end', () => controller.close())
        req.on('error', (err) => controller.error(err))
      },
    })
    const request = new Request('http://localhost/_telefunc', {
      method: req.method!,
      headers: req.headers as Record<string, string>,
      body,
      // @ts-ignore duplex required for streaming request bodies
      duplex: 'half',
    })

    const httpResponse = await telefunc({ request })
    res.setHeader('Content-Type', httpResponse.contentType)
    res.statusCode = httpResponse.statusCode
    res.end(httpResponse.body)
  })
}
