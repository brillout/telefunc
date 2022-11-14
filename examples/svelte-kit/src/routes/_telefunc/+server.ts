import { telefunc } from 'telefunc'
import type { RequestHandler } from './$types'

const GET: RequestHandler = async (event) => {
  const body = await event.request.text()
  const method = event.request.method
  const url = event.request.url

  const httpResponse = await telefunc({ url, method, body })
  const { body: responseBody, statusCode, contentType } = httpResponse

  return new Response(responseBody, {
    headers: new Headers({ contentType }),
    status: statusCode
  })
}

export { GET, GET as POST }
