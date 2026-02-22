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
  config.disableNamingConvention = true
  app.all('/_telefunc', async (req, res) => {
    const httpResponse = await telefunc({
      url: req.originalUrl,
      method: req.method,
      readable: req,
      contentType: req.headers['content-type'] || '',
    })
    res.status(httpResponse.statusCode).type(httpResponse.contentType).send(httpResponse.body)
  })
}

async function installFrontend(app) {
  const vite = await import('vite')
  const viteDevMiddleware = (
    await vite.createServer({
      server: { middlewareMode: true },
    })
  ).middlewares
  app.use(viteDevMiddleware)
}
