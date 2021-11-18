import { Todo } from '@prisma/client'
import { useEffect, useState } from 'react'
import NewTodo from './NewTodo'
import { getTodos } from './todo.telefunc'

export { TodoList }

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
      <NewTodo
        onTodoListUpdate={(todoItems) => {
          setTodoItems(todoItems)
        }}
      />
      <hr />
      <ul>
        {todoItems.map((todoItem, i) => (
          <li key={todoItem.id}>
            <h2>
              {i + 1}- {todoItem.title} {todoItem.completed ? '✅' : '❌'}
            </h2>
            <p>{todoItem.content}</p>
          </li>
        ))}
      </ul>
    </>
  )
}
