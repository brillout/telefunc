// @ts-ignore
import { Todo } from '@prisma/client'
import { useEffect, useState } from 'react'
import NewTodo from './NewTodo'
import { onDeleteTodo, onGetTodos, onToggleTodo } from './TodoList.telefunc'

export { TodoList }

function TodoItem({ refetch, ...todo }: Todo & { refetch: () => void }) {
  return (
    <li key={todo.id}>
      <h2>
        {todo.title}{' '}
        <button
          id={'toggle-' + todo.id}
          onClick={async () => {
            await onToggleTodo(todo.id)
            refetch()
          }}
        >
          {todo.completed ? '✅ done' : '❌ undone'}
        </button>
      </h2>
      id: <span>{todo.id}</span>
      <p>{todo.content}</p>
      <button
        onClick={async () => {
          await onDeleteTodo(todo.id)
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
    setTodoItems(await onGetTodos())
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
