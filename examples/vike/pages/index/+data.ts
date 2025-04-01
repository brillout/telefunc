export { data }
export type Data = ReturnType<typeof data>

import { todoItems } from '../../database/todoItems'

function data() {
  const todoItemsInitial = todoItems
  return {
    todoItemsInitial,
  }
}
