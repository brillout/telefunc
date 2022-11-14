import type { Handle } from '@sveltejs/kit'
import cookie from 'cookie'

export const handle: Handle = async ({ event, resolve }) => {
  const cookies = cookie.parse(event.request.headers.get('cookie') || '')
  event.locals.user = { name: cookies.user ?? 'Elizabeth', id: 0 }

  return resolve(event)
}
