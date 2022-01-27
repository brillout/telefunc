import { shield } from 'telefunc'
import { TodoModel, TodoItem, TodoItemShield } from '#app/db'
import { getUser } from '#app/auth/getUser'

export { onNewTodo }
export { onClear }

shield(onNewTodo, [TodoItemShield])
async function onNewTodo(todoItemNew: TodoItem): Promise<TodoItem[]> {
  const user = getUser()
  TodoModel.add(user.id, todoItemNew)
  const todoItems = TodoModel.getAll(user.id)
  return todoItems
}

async function onClear() {
  const user = getUser()
  TodoModel.deleteAll(user.id)
}
