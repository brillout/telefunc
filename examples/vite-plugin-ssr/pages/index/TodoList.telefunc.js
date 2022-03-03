import { getContext } from 'telefunc'

export { loadData }
export { onNewTodo }

const database = {
  todoItems: []
}

async function loadData() {
  const { user } = getContext()
  const { todoItems } = database
  return {
    user,
    todoItems
  }
}

async function onNewTodo({ text }) {
  database.todoItems.push({ text })
  const { todoItems } = database
  return { todoItems }
}

// Initial data
database.todoItems.push({ text: 'Buy milk' })
database.todoItems.push({ text: 'Buy strawberries' })
