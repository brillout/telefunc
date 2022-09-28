export { retrieveUser }

import { User, UserModel } from '#app/db'
import { COOKIE_NAME } from './COOKIE_NAME'

function retrieveUser(req: { cookies: { [COOKIE_NAME]?: string } }): User | null {
  const userId = retrieveUserId(req.cookies[COOKIE_NAME])
  if (userId === null) {
    return null
  }
  const user = UserModel.getOne(userId)
  return user
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
