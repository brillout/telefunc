import { handleTelefunc } from './telefunc'

export default {
  async fetch(request) {
    const url = new URL(request.url)
    const { pathname } = new URL(url)

    // Serve Telefunc
    if (pathname.startsWith('/_telefunc')) {
      const body = await request.text()
      const { method } = request
      const response = await handleTelefunc({ url: pathname, method, body })
      return response
    }

    // 404
    return new Response('404 Not Found', {
      status: 404,
      headers: { 'content-type': 'text/plain; charset=UTF-8' },
    })
  },
}
