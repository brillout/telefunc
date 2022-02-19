import { shield } from 'telefunc'
import { UserModel } from '#app/db'

export { createAccount }

shield(createAccount, [shield.type.string])
async function createAccount(name: string) {
  UserModel.add(name)
  const users = UserModel.getAll()
  const userList = Object.values(users)
  return userList
}
