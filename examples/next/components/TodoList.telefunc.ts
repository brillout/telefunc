export { onNewTodo }

import { getContext, Abort } from 'telefunc'
import { Todo } from '../database/Todo'

async function onNewTodo({ text }: { text: string }) {
  const { user } = getContext()
  if (!user) {
    throw Abort()
  }
  const authorId = user.id
  Todo.createNew({ text, authorId })
  const todoItems = Todo.findMany({ authorId })
  return { todoItems }
}
