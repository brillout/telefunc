import React, { useState, useEffect, useRef } from 'react'
import { addTodoItem, getTodoItems, clearTodoItems } from '../../todoItems.telefunc'

export { Page }

function Page(props) {
  return (
    <>
      <h1>My to-do list</h1>
      <TodoList todoItemsInitial={props.todoItemsInitial} />
    </>
  )
}
function TodoList({ todoItemsInitial }) {
  const [todoItems, setTodoItems] = useState(todoItemsInitial)
  return (
    <>
      <ul>
        {todoItems.map((todoItem, i) => (
          <li key={i}>{todoItem.text}</li>
        ))}
        <li>
          <NewTodo
            onChange={async () => {
              const todoItems = await getTodoItems()
              setTodoItems(todoItems)
            }}
          />
        </li>
      </ul>
    </>
  )
}

function NewTodo({ onChange }) {
  const [text, setText] = useState('')
  const inputEl = useRef(null)
  const focusInput = () => {
    inputEl.current.focus()
  }
  return (
    <Form
      onSubmit={async () => {
        await addTodoItem({ text })
        await onChange()
        setText('')
      }}
      onAfterHydration={focusInput}
      onAfterSubmit={focusInput}
    >
      <input
        type="text"
        value={text}
        ref={inputEl}
        onChange={(ev) => {
          setText(ev.target.value)
        }}
      />
      <button type="submit" style={{ margin: '0 10px' }}>
        Add Todo
      </button>
      <button
        type="button"
        onClick={async () => {
          await clearTodoItems()
          await onChange()
          focusInput()
        }}
      >
        Clear All
      </button>
    </Form>
  )
}

function Form({ children, onSubmit, onAfterSubmit, onAfterHydration }) {
  const [disabled, setDisable] = useState(true)
  useEffect(() => {
    setDisable(false)
    setTimeout(() => {
      onAfterHydration()
    }, 0)
  }, [])
  return (
    <form
      onSubmit={async (ev) => {
        ev.preventDefault()
        setDisable(true)
        await onSubmit()
        setDisable(false)
        onAfterSubmit()
      }}
    >
      <fieldset disabled={disabled} style={{ border: 0, padding: 0, margin: 0 }}>
        {children}
      </fieldset>
    </form>
  )
}
