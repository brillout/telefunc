import { UserModel } from '#root/db'

export { createAccount }

async function createAccount(name: string) {
  UserModel.add(name)
  const users = UserModel.getAll()
  const userList = Object.values(users)
  return userList
}
