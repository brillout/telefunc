export { Todo }
export type { TodoItem, User, UserId }

type TodoItem = {
  text: string
}

type UserId = number
type User = {
  id: UserId
  name: string
}

const db: Record<UserId, TodoItem[]> = {}

class Todo {
  static add(userId: UserId, todoItemNew: TodoItem) {
    this._init(userId)
    const todoItems = db[userId]
    todoItems.push(todoItemNew)
  }
  static getAll(userId: UserId) {
    this._init(userId)
    const todoItems = db[userId]
    return todoItems
  }
  static deleteAll(userId: UserId) {
    this._init(userId)
    const todoItems = db[userId]
    todoItems.length = 0
  }
  static _init(userId: UserId) {
    db[userId] = db[userId] || []
  }
}
