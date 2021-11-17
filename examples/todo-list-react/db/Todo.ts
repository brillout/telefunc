import { shield } from 'telefunc'
import { data } from './data'
import { UserId } from './User'

export { TodoModel }
export { TodoItemShield }
export type { TodoItem }

const t = shield.type
const TodoItemShield = t.object({
  text: t.string,
})
type TodoItem = typeof TodoItemShield

class TodoModel {
  static add(userId: UserId, todoItemNew: TodoItem) {
    const todoItems = this._init(userId)
    todoItems.push(todoItemNew)
  }
  static getAll(userId: UserId) {
    const todoItems = this._init(userId)
    return todoItems
  }
  static deleteAll(userId: UserId) {
    const todoItems = this._init(userId)
    todoItems.length = 0
  }
  static _init(userId: UserId) {
    data.todoLists[userId] = data.todoLists[userId] || []
    return data.todoLists[userId]!
  }
}
