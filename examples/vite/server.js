import express from 'express'
import { createTelefuncCaller } from 'telefunc'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import * as helloTelefunctions from './hello.telefunc.js'

const isProduction = process.env.NODE_ENV === 'production'
const __dirname = dirname(fileURLToPath(import.meta.url))
const root = __dirname

startServer()

async function startServer() {
  const app = express()

  await installTelefunc(app)
  await installVite(app)

  const port = process.env.PORT || 3000
  app.listen(port)
  console.log(`Server running at http://localhost:${port}`)
}

async function installTelefunc(app) {
  const callTelefunc = await createTelefuncCaller({
    isProduction,
    root,
    telefuncFiles: { '/hello.telefunc.js': helloTelefunctions },
  })
  app.use(express.text())
  app.all('/_telefunc', async (req, res, next) => {
    const httpRequest = { url: req.originalUrl, method: req.method, body: req.body }
    const httpResponse = await callTelefunc(httpRequest)
    if (!httpResponse) return next()
    res.status(httpResponse.statusCode).type(httpResponse.contentType).send(httpResponse.body)
  })
}

async function installVite(app) {
  if (isProduction) {
    app.use(express.static(`${root}/dist/client`))
  } else {
    const { createServer } = await import('vite')
    const vite = await createServer({
      root,
      server: { middlewareMode: 'html' },
    })
    app.use(vite.middlewares)
  }
}
