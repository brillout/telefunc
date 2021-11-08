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
    const id = Object.keys(data.users).length
    data.users[id] = { id, name }
  }
  static getAll() {
    const userList = Object.values(data.users)
    return userList
  }
  static getOne(id: UserId) {
    const user = data.users[id] || null
    return user
  }
}
