import { getContext } from 'telefunc'
import type { Context } from './Context'

export { getUser }
export { getUserId }

function getUserId() {
  const user = getUser()
  return user.id
}
function getUser() {
  const context = getContext<Context>()
  return context.user
}
