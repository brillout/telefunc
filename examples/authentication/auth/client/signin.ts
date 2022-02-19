// Environment: Browser

export { signin }

import { COOKIE_NAME } from '../COOKIE_NAME'
import { setCookie } from './cookie'

function signin(userId: number) {
  setCookie(COOKIE_NAME, JSON.stringify(userId))
  reload()
}

function reload() {
  window.location.reload()
}
