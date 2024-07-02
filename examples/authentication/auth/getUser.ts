export { getUser }

import { getContext, Abort } from 'telefunc'

function getUser() {
  const { user } = getContext()
  if (!user) throw Abort('LOGGED_OUT')
  return user
}
