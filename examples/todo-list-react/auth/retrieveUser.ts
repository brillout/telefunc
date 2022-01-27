export { retrieveUser }

import { UserModel } from '#app/db'
import { COOKIE_NAME } from './COOKIE_NAME'

function retrieveUser(req: { cookies: { [COOKIE_NAME]?: string } }) {
  const userId = getUserId(req.cookies[COOKIE_NAME])
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
