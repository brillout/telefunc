import { TodoItem } from './Todo'
import type { User, UserId } from './User'

export { data }

const dataInit: Data = {
  todoLists: {
    0: [{ text: 'Cherries' }, { text: 'Milk' }],
    1: [{ text: 'Bananas' }, { text: 'Milkshake' }]
  },
  users: {
    0: {
      id: 0,
      name: 'Rom'
    },
    1: {
      id: 1,
      name: 'Mohammad'
    }
  }
}

global._data = global._data || dataInit
const data: Data = global._data

type Data = {
  todoLists: Record<UserId, TodoItem[]>
  users: Record<UserId, User>
}
declare global {
  var _data: undefined | Data
}
