import { createTelefuncCaller } from 'telefunc'

const callTelefunc = createTelefuncCaller({ isProduction: process.env.NODE_ENV === 'production', root: process.cwd() })

export default async function _telefunc(req, res) {
  const { originalUrl: url, method, body, headers } = req
  const userAgent = headers['user-agent']
  const context = {
    userAgent,
  }
  const result = await callTelefunc({ url, method, body }, context)

  res.status(result?.statusCode).type(result?.contentType).send(result?.body)
}
