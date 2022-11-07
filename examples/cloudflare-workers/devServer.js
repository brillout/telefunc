const express = require('express')
const { telefunc, config } = require('telefunc')

startServer()

async function startServer() {
  const app = express()
  installTelefunc(app)
  await installFrontend(app)
  start(app)
}

function start(app) {
  const port = process.env.PORT || 3000
  app.listen(port)
  console.log(`Server running at http://localhost:${port}`)
}

function installTelefunc(app) {
  app.use(express.text())
  config.disableNamingConvention = true
  app.all('/_telefunc', async (req, res) => {
    const { originalUrl: url, method, body } = req
    const httpResponse = await telefunc({ url, method, body })
    res.status(httpResponse.statusCode).type(httpResponse.contentType).send(httpResponse.body)
  })
}

async function installFrontend(app) {
  const vite = await import('vite')
  const viteDevMiddleware = (
    await vite.createServer({
      server: { middlewareMode: 'html' }
    })
  ).middlewares
  app.use(viteDevMiddleware)
}
