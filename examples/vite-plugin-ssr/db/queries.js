export { addTodoItem }
export { getTodoItems }
export { clearTodoItems }

const todoItems = [
  {
    text: 'Milk',
  },
  {
    text: 'Cherries',
  },
]

async function addTodoItem(todoItemNew) {
  todoItems.push(todoItemNew)
}

async function getTodoItems() {
  return todoItems
}
async function clearTodoItems() {
  todoItems.length = 0
}
