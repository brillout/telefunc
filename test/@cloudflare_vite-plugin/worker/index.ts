import { handleSsr } from './ssr'

export default {
  async fetch(request) {
    const url = new URL(request.url)

    return await handleSsr(url)
  },
} satisfies ExportedHandler<Env>

async function handleTelefunc({ url, method, body }: any) {
  const httpResponse = await telefunc({ url, method, body })
  return new Response(httpResponse.body, {
    headers: { 'content-type': httpResponse.contentType },
    status: httpResponse.statusCode,
  })
}
