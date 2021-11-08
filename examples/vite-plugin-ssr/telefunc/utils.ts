import { getContext, Abort } from 'telefunc'
import type { Context } from './Context'
import type { User } from '../db'

export { getUser }
export { getUserId }

function getUserId() {
  const user = getUser()
  return user.id
}
function getUser(): User
function getUser({ allowAnynomous }: { allowAnynomous: true }): null | User
function getUser({ allowAnynomous = true } = {}) {
  const context = getContext<Context>()
  const { user } = context
  if (!user && !allowAnynomous) {
    throw Abort()
  }
  return user
}
