import { User, UserModel } from '../db'

export { getLoggedUser }

function getLoggedUser(cookies: { ['user-id']?: string }): null | User {
  const userId = getUserId(cookies['user-id'])
  if (userId === null) {
    return null
  }
  return UserModel.getOne(userId)
}

function getUserId(cookieVal: string | undefined): null | number {
  if (cookieVal === undefined) {
    return 0
  }
  const parsed: null | number = JSON.parse(cookieVal)
  if (parsed === null) {
    return null
  }
  const userId = parsed
  return userId
}
