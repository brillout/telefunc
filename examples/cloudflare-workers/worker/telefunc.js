import { telefunc } from 'telefunc'

export { handleTelefunc }

async function handleTelefunc({ url, method, body }) {
  const httpResponse = await telefunc({ url, method, body })
  return new Response(httpResponse.body, {
    headers: { 'content-type': httpResponse.contentType },
    status: httpResponse.statusCode,
  })
}
