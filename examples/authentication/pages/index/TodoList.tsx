import React, { useState } from 'react'
import { TodoItem } from '#app/db/Todo'
import { NewTodo } from './TodoList/NewTodo'

export { TodoList }

function TodoList({ todoItemsInitial }: { todoItemsInitial: TodoItem[] }) {
  const [todoItems, setTodoItems] = useState(todoItemsInitial)
  return (
    <>
      <ul>
        {todoItems.map((todoItem, i) => (
          <li key={i}>{todoItem.text}</li>
        ))}
        <li>
          <NewTodo
            onTodoListUpdate={(todoItems) => {
              setTodoItems(todoItems)
            }}
          />
        </li>
      </ul>
    </>
  )
}
