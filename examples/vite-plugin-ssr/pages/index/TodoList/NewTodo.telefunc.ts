import { Todo, TodoItem } from '../../../db/Todo'
import { getUserId } from '../../../telefunc/utils'

export { onNewTodo }
export { onClear }

async function onNewTodo(todoItemNew: TodoItem): Promise<TodoItem[]> {
  const userId = getUserId()
  Todo.add(userId, todoItemNew)
  const todoItems = Todo.getAll(userId)
  return todoItems
}

async function onClear() {
  const userId = getUserId()
  Todo.deleteAll(userId)
}
