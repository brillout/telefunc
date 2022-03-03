import { handleTelefunc } from './telefunc'
import { handleStaticAssets } from './static-assets'

addEventListener('fetch', (event) => {
  try {
    event.respondWith(
      handleFetchEvent(event).catch((err) => {
        console.error(err.stack)
      })
    )
  } catch (err) {
    console.error(err.stack)
    event.respondWith(new Response('Internal Server Error (Worker)', { status: 500 }))
  }
})

async function handleFetchEvent(event) {
  const { url } = event.request
  const { pathname } = new URL(url)

  // Serve Telefunc
  if (pathname.startsWith('/_telefunc')) {
    const body = await event.request.text()
    const { method } = event.request
    const response = await handleTelefunc({ url, method, body })
    return response
  }

  // Serve Frontend
  const response = await handleStaticAssets(event)
  return response
}
