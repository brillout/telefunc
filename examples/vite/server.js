import express from 'express'
import { createTelefuncCaller } from 'telefunc'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const isProduction = process.env.NODE_ENV === 'production'
const __dirname = dirname(fileURLToPath(import.meta.url))
const root = __dirname

startServer()

async function startServer() {
  const app = express()

  const viteDevServer = await getViteDevServer()

  await installTelefunc(app, viteDevServer)

  if (viteDevServer) {
    app.use(viteDevServer.middlewares)
  } else {
    // In production, we simply statically serve `dist/client/`
    app.use(express.static(`${root}/dist/client`))
  }

  const port = process.env.PORT || 3000
  app.listen(port)
  console.log(`Server running at http://localhost:${port}`)
}

async function installTelefunc(app, viteDevServer) {
  const callTelefunc = createTelefuncCaller({
    isProduction,
    root,
    viteDevServer,
  })
  app.use(express.text())
  app.all('/_telefunc', async (req, res, next) => {
    const httpRequest = { url: req.originalUrl, method: req.method, body: req.body }
    const httpResponse = await callTelefunc(httpRequest)
    if (!httpResponse) return next()
    res.status(httpResponse.statusCode).type(httpResponse.contentType).send(httpResponse.body)
  })
}

async function getViteDevServer() {
  if (isProduction) {
    return null
  } else {
    const { createServer } = await import('vite')
    const viteDevServer = await createServer({
      root,
      server: { middlewareMode: 'html' },
    })
    return viteDevServer
  }
}
