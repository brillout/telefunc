import { createTelefuncCaller } from 'telefunc'
import type { GetServerSidePropsContext } from 'next'

const callTelefuncPromise = createTelefuncCaller({
  isProduction: process.env.NODE_ENV === 'production',
  root: process.cwd(),
  urlPath: '/api/_telefunc',
})

export default async function _telefunc(
  req: GetServerSidePropsContext['req'] & { url: string; method: string; body: string },
  res: GetServerSidePropsContext['res'],
) {
  let callTelefunc = await callTelefuncPromise

  const { url, method, body } = req

  const httpResponse = await callTelefunc({ url, method, body })

  if (httpResponse) {
    res.writeHead(httpResponse.statusCode).end(httpResponse.body)
    return
  }
  res.writeHead(500).end('Internal server error')
}
