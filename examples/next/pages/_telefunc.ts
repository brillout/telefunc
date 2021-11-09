import type { GetServerSidePropsContext } from 'next'
import * as personsTelefunctions from '../telefunc/persons.telefunc'

export default function () {}

type PromiseType<T> = T extends PromiseLike<infer U> ? U : T

let callTelefunc: PromiseType<ReturnType<typeof import('telefunc')['createTelefuncCaller']>>

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
  if (!callTelefunc) {
    try {
      const { createTelefuncCaller } = await import('telefunc')
      callTelefunc = await createTelefuncCaller({
        isProduction: process.env.NODE_ENV === 'production',
        root: process.cwd(),
        telefunctions: { '/telefunc/persons.telefunc.ts': personsTelefunctions },
      })
    } catch {}
  }

  const { url = '', method = '' } = req
  const body = await getBody(req)

  const result = await callTelefunc({ url, method, body })

  res.writeHead(result?.statusCode || 500).end(result?.body || 'Internal server error')

  return { props: {} }
}

const getBody = (req: GetServerSidePropsContext['req']) => {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk
    })
    req.on('end', () => {
      resolve(body)
    })
    req.on('error', (err) => {
      reject(err)
    })
  })
}
