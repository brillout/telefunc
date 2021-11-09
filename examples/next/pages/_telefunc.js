import * as personsTelefunctions from '../telefunc/persons.telefunc'
import { createTelefuncCaller } from 'telefunc'


export default function() {}

export async function getServerSideProps({ req, res }) {
  const callTelefunc = createTelefuncCaller({
    isProduction: process.env.NODE_ENV === 'production',
    root: process.cwd(),
  })
  console.log(req, res)

  const { originalUrl: url, method, body, headers } = req
  const userAgent = headers['user-agent']
  const context = {
    userAgent,
  }
  const result = await callTelefunc({ url, method, body }, context)

  res.status(result?.statusCode).type(result?.contentType).send(result?.body)
}
