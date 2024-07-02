export { onLoad }
export { onNewTodo }

import { getUser } from '../auth/getUser'
import { Todo } from '../database/Todo'

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
