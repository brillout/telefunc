import { getUser } from '../../auth/getUser'
import { telefunc, config, provideContext } from 'telefunc'

config.telefuncUrl = '/api/_telefunc'

export default async function (req, res) {
  const user = getUser(req)
  provideContext({ user })
  const { url, method, body } = req
  const httpRequest = { url, method, body }
  const httpResponse = await telefunc(httpRequest)
  res.status(httpResponse.statusCode).send(httpResponse.body)
}
