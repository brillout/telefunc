export { onCreateAccount }

import { shield } from 'telefunc'
import { UserModel } from '#app/db'

const onCreateAccount = shield([shield.type.string], async function (name) {
  UserModel.add(name)
  const users = UserModel.getAll()
  const userList = Object.values(users)
  return userList
})
