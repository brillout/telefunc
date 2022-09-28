import { TodoModel, UserModel } from '#app/db'
import { getContext } from 'telefunc'

export { loadData }

async function loadData() {
  const { user } = getContext()
  if (!user) {
    const userListInitial = UserModel.getAll()
    return { userListInitial, notLoggedIn: true as const }
  }
  const todoItemsInitial = TodoModel.getAll(user.id)
  return { todoItemsInitial, user }
}
