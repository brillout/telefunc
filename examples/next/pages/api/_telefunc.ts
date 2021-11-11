import { createTelefuncCaller } from 'telefunc'
import type { GetServerSidePropsContext } from 'next'
import * as personsTelefunctions from '../../telefunc/persons.telefunc'

const callTelefuncPromise = createTelefuncCaller({
  isProduction: process.env.NODE_ENV === 'production',
  root: process.cwd(),
  telefunctions: { '/telefunc/persons.telefunc.ts': personsTelefunctions as any },
  urlPath: '/api/_telefunc',
})

export default async function _telefunc(
  req: GetServerSidePropsContext['req'] & { body: string },
  res: GetServerSidePropsContext['res'],
) {
  let callTelefunc = await callTelefuncPromise

  const { url = '', method = 'POST', body } = req

  const httpResponse = await callTelefunc({ url, method, body })

  if (httpResponse) {
    res.writeHead(httpResponse.statusCode).end(httpResponse.body)
    return
  }
  res.writeHead(500).end('Internal server error')
}
