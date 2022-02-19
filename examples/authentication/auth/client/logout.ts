// Environment: Browser

export { logout }

import { COOKIE_NAME } from '../COOKIE_NAME'
import { setCookie } from './cookie'

function logout() {
  setCookie(COOKIE_NAME, JSON.stringify(null))
  reload()
}

function reload() {
  window.location.reload()
}
