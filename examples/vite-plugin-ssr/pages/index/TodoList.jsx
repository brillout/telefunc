import React, { useState } from 'react'
import { onNewTodo, loadTodoItems } from './TodoList.telefunc.js'
import { useAsync } from 'react-streaming'

export { TodoList }

function TodoList() {
  const todoItemsInitial = useAsync('loadTodoItems', async () => {
    const todoItems = await loadTodoItems()
    return todoItems
  })
  const [todoItems, setTodoItems] = useState(todoItemsInitial)
  const [draft, setDraft] = useState('')
  return (
    <>
      <ul>
        {todoItems.map((todoItem, i) => (
          <li key={i}>{todoItem.text}</li>
        ))}
        <li>
          <form
            onSubmit={async (ev) => {
              ev.preventDefault()
              const { todoItems } = await onNewTodo({ text: draft })
              setDraft('')
              setTodoItems(todoItems)
            }}
          >
            <input type="text" onChange={(ev) => setDraft(ev.target.value)} value={draft} />{' '}
            <button type="submit">Add to-do</button>
          </form>
        </li>
      </ul>
    </>
  )
}
