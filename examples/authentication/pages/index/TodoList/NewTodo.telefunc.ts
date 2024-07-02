export { onNewTodo }
export { onClear }

import { shield } from 'telefunc'
import { getUser } from '#app/auth/getUser'
import { TodoItem, TodoItemShield, TodoModel } from '#app/db'

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
