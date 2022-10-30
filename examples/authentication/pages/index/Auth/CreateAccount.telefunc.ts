import { shield } from 'telefunc'
import { UserModel } from '#app/db'

export { onCreateAccount }

shield(onCreateAccount, [shield.type.string])
async function onCreateAccount(name: string) {
  UserModel.add(name)
  const users = UserModel.getAll()
  const userList = Object.values(users)
  return userList
}
