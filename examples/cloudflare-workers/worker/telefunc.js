import { telefunc, config } from 'telefunc'

export { handleTelefunc }

config.disableNamingConvention = true

async function handleTelefunc({ url, method, body }) {
  const httpResponse = await telefunc({ url, method, body })
  return new Response(httpResponse.body, {
    headers: { 'content-type': httpResponse.contentType },
    status: httpResponse.statusCode,
  })
}
