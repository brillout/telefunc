import { setCookie } from './cookie'

export { signin }
export { logout }

const COOKIE_NAME = 'user-id'

function signin(userId: number) {
  setCookie(COOKIE_NAME, JSON.stringify(userId))
  window.location.reload()
}

function logout() {
  setCookie(COOKIE_NAME, JSON.stringify(null))
  window.location.reload()
}
