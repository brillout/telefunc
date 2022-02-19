import { Todo } from '../database/Todo'
import { getUser } from '../auth/getUser'

export { getTodoListData }
export { onNewTodo }

async function getTodoListData() {
  const user = getUser()
  const authorId = user.id
  const userName = user.name
  const todoItems = Todo.findMany({ authorId })
  return { todoItems, userName }
}

async function onNewTodo({ text }) {
  const user = getUser()
  const authorId = user.id
  await Todo.createNew({ text, authorId })
  const todoItems = Todo.findMany({ authorId })
  return { todoItems }
}
