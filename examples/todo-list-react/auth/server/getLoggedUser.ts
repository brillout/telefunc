// Environment: Node.js

import { User, UserModel } from '#root/db'
import { COOKIE_NAME } from '../COOKIE_NAME'

export { getLoggedUser }

function getLoggedUser(cookies: { [COOKIE_NAME]?: string }): null | User {
  const userId = getUserId(cookies[COOKIE_NAME])
  if (userId === null) {
    return null
  }
  return UserModel.getOne(userId)
}

function getUserId(cookieVal: string | undefined): null | number {
  // Hack for automatic login:
  //  - No cookie set at all => login as user with ID `0`
  //  - Cookie set to `null` => anonymous
  if (cookieVal === undefined) return 0

  const parsed: null | number = JSON.parse(cookieVal)
  if (parsed === null) {
    return null
  }

  const userId = parsed
  return userId
}
