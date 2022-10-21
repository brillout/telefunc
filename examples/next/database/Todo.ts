export { Todo }
export type { TodoItem }

const Todo = {
  findMany,
  createNew
}

type TodoItem = {
  text: string
  authorId: number
}

const database = (global.database = global.database || {
  todoItems: [
    { text: 'Buy milk', authorId: 0 },
    { text: 'Buy strawberries', authorId: 0 }
  ]
})

function findMany({ authorId }: { authorId: number }) {
  return database.todoItems.filter((todoItem) => todoItem.authorId === authorId)
}

function createNew({ text, authorId }: { text: string; authorId: number }) {
  database.todoItems.push({ text, authorId })
}

declare global {
  var database:
    | undefined
    | {
        todoItems: TodoItem[]
      }
}
