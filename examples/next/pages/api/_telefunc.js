import * as personsTelefunctions from '../../telefunc/persons.telefunc'
import { createTelefuncCaller } from 'telefunc'

console.log(personsTelefunctions)
const callTelefunc = createTelefuncCaller({ isProduction: process.env.NODE_ENV === 'production', root: process.cwd() })

export default async function _telefunc(req, res) {
  console.log(req.method)
  const { originalUrl: url, method, body, headers } = req
  const userAgent = headers['user-agent']
  const context = {
    userAgent,
  }
  const result = await callTelefunc({ url, method, body }, context)

  res.status(result?.statusCode).type(result?.contentType).send(result?.body)
}
