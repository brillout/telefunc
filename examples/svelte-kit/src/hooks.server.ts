import type { Handle } from '@sveltejs/kit'
import cookie from 'cookie'
import { provideTelefuncContext } from 'telefunc'
import 'telefunc/async_hooks'

export const handle: Handle = async ({ event, resolve }) => {
  const cookies = cookie.parse(event.request.headers.get('cookie') || '')
  event.locals.user = { name: cookies.user ?? 'Elizabeth', id: 0 }

  // Provide telefunc context for all requests
  provideTelefuncContext(event.locals)

  return resolve(event)
}
