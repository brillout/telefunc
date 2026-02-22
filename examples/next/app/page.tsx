import { getUser } from '../auth/getUser'
import { TodoList } from '../components/TodoList'
import { Todo } from '../database/Todo'

export const dynamic = 'force-dynamic'

export default function Page() {
  const user = getUser()
  const todoItems = Todo.findMany({ authorId: user.id })
  return (
    <>
      <h1>{`${user.name}'s to-do list`}</h1>
      <TodoList todoItemsInitial={todoItems} />
    </>
  )
}
