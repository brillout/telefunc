import { TodoItem } from './Todo'
import type { User, UserId } from './User'

type Data = {
  todoLists: Record<UserId, TodoItem[]>
  users: Record<UserId, User>
}
export const data: Data = {
  todoLists: {},
  users: {},
}
