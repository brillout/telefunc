// @ts-ignore
import { Todo } from '@prisma/client'
import { useEffect, useState } from 'react'
import { NewTodo } from './NewTodo'
import { onDeleteTodo, onGetTodos, onToggleTodo } from './TodoList.telefunc'

export { TodoList }

function TodoItem({ refetch, ...todo }: Todo & { refetch: () => void }) {
  const textStyle = {
    textDecoration: todo.completed ? 'line-through' : undefined
  }
  return (
    <li key={todo.id}>
      <h2>
        <span style={textStyle}>{todo.title}</span>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={async () => {
            await onToggleTodo(todo.id)
            refetch()
          }}
          style={{ cursor: 'pointer', margin: 13 }}
        />
        <button
          className="remove"
          onClick={async () => {
            await onDeleteTodo(todo.id)
            refetch()
          }}
        >
          remove
        </button>
      </h2>
      <p>
        <span style={textStyle}>{todo.content}</span>
        {todo.completed && ' ✅ done'}
      </p>
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
        {todoItems.map((todoItem) => (
          <TodoItem key={todoItem.id} refetch={fetch} {...todoItem} />
        ))}
      </ul>
    </>
  )
}
