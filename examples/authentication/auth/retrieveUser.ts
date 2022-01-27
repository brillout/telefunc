export { retrieveUser }

import { UserModel } from '#app/db'
import { COOKIE_NAME } from './COOKIE_NAME'

function retrieveUser(req: { cookies: { [COOKIE_NAME]?: string } }) {
  const userId = retrieveUserId(req.cookies[COOKIE_NAME])
  if (userId === null) {
    return null
  }
  return UserModel.getOne(userId)
}

function retrieveUserId(cookieVal: string | undefined): null | number {
  if (!cookieVal) {
    return null
  }

  const parsed: null | number = JSON.parse(cookieVal)
  if (parsed === null) {
    return null
  }

  const userId = parsed
  return userId
}
