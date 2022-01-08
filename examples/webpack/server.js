const express = require('express')
const { createTelefuncCaller } = require('telefunc')

const isProduction = process.env.NODE_ENV === 'production'
const root = __dirname

startServer()

async function startServer() {
  const app = express()

  app.use(express.static(`${root}/dist`))

  const callTelefunc = createTelefuncCaller({ isProduction, root })
  app.use(express.text())
  app.all('/_telefunc', async (req, res, next) => {
    const { originalUrl: url, method, body } = req
    const httpResponse = await callTelefunc({ url, method, body })
    if (!httpResponse) return next()
    res.status(httpResponse.statusCode).type(httpResponse.contentType).send(httpResponse.body)
  })

  const port = process.env.PORT || 3000
  app.listen(port)
  console.log(`Server running at http://localhost:${port}`)
}
