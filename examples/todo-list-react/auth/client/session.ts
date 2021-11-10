// Environment: Browser

import { COOKIE_NAME } from '../COOKIE_NAME'
import { setCookie } from './cookie'

export { signin }
export { logout }

function signin(userId: number) {
  setCookie(COOKIE_NAME, JSON.stringify(userId))
  reload()
}

function logout() {
  setCookie(COOKIE_NAME, JSON.stringify(null))
  reload()
}

function reload() {
  window.location.reload()
}
