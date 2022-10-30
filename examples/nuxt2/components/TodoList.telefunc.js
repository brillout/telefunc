import { Todo } from '../database/Todo'
import { getUser } from '../auth/getUser'

export { onLoad }
export { onNewTodo }

async function onLoad() {
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
