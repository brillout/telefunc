import { TodoModel, TodoItem } from '../../../db'
import { getUserId } from '../../../telefunc/utils'

export { onNewTodo }
export { onClear }

async function onNewTodo(todoItemNew: TodoItem): Promise<TodoItem[]> {
  const userId = getUserId()
  TodoModel.add(userId, todoItemNew)
  const todoItems = TodoModel.getAll(userId)
  return todoItems
}

async function onClear() {
  const userId = getUserId()
  TodoModel.deleteAll(userId)
}
