import { getUser } from '../../auth/getUser'
import { createTelefuncCaller, provideContext } from 'telefunc'

const callTelefunc = createTelefuncCaller({
  isProduction: process.env.NODE_ENV === 'production',
  root: process.cwd(),
  telefuncUrl: '/api/_telefunc',
})

export default async function (req, res) {
  const user = getUser(req)
  provideContext({ user })
  const { url, method, body } = req
  const httpRequest = { url, method, body }
  const httpResponse = await callTelefunc(httpRequest)
  res.status(httpResponse.statusCode).send(httpResponse.body)
}
