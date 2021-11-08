import { data } from './data'

export { UserModel }
export type { User, UserId }

type User = {
  id: UserId
  name: string
}
type UserId = number

class UserModel {
  static add(name: string) {
    const { users } = data
    const id = Object.keys(users).length
    data.users[id] = { id, name }
  }
  static getAll() {
    const { users } = data
    const userList = Object.values(users)
    return userList
  }
}
