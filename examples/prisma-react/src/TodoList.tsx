import { Todo } from '@prisma/client'
import { useEffect, useState } from 'react'
import NewTodo from './NewTodo'
import { deleteTodo, getTodos, toggleTodo } from './todo.telefunc'

export { TodoList }

function TodoItem({ refetch, ...todo }: Todo & { refetch: () => void }) {
  return (
    <li key={todo.id}>
      <h2>
        {todo.title}{' '}
        <button
          onClick={async () => {
            await toggleTodo(todo.id)
            refetch()
          }}
        >
          {todo.completed ? '✅' : '❌'}
        </button>
      </h2>
      <p>{todo.content}</p>
      <button
        onClick={async () => {
          await deleteTodo(todo.id)
          refetch()
        }}
      >
        remove
      </button>
    </li>
  )
}

function TodoList() {
  const [todoItems, setTodoItems] = useState<Todo[]>([])

  const fetch = async () => {
    setTodoItems(await getTodos())
  }

  useEffect(() => {
    fetch()
  }, [])

  return (
    <>
      <NewTodo refetch={fetch} />
      <hr />
      <ul>
        {todoItems.map((todoItem, i) => (
          <TodoItem key={i} refetch={fetch} {...todoItem} />
        ))}
      </ul>
    </>
  )
}
