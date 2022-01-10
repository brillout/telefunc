import { getContext, Abort } from 'telefunc'
import type { User } from '#root/db'

export { getUser }
export { getUserId }

function getUser(): User
function getUser({ allowAnynomous }: { allowAnynomous: true }): null | User
function getUser({ allowAnynomous = false } = {}): null | User {
  const context = getContext()
  const { user } = context
  if (!user && !allowAnynomous) {
    throw Abort()
  }
  return user
}

function getUserId() {
  const user = getUser()
  return user.id
}
