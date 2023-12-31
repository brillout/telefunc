export { onNewTodo }
export { onClear }

import { shield } from 'telefunc'
import { TodoModel, TodoItem, TodoItemShield } from '#app/db'
import { getUser } from '#app/auth/getUser'

const onNewTodo = shield([TodoItemShield], async function (todoItemNew): Promise<TodoItem[]> {
  const user = getUser()
  TodoModel.add(user.id, todoItemNew)
  const todoItems = TodoModel.getAll(user.id)
  return todoItems
})

async function onClear() {
  const user = getUser()
  TodoModel.deleteAll(user.id)
}
