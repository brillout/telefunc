import React, { useState, useRef } from 'react'
import { onNewTodo, onClear } from './NewTodo.telefunc'
import { Form } from './Form'
import { TodoItem } from '../../../db/Todo'

export { NewTodo }

function NewTodo({ onTodoListUpdate }: { onTodoListUpdate: (todoItems: TodoItem[]) => void }) {
  const [text, setText] = useState('')
  const inputEl = useRef<HTMLInputElement>(null)
  const focusInput = () => {
    inputEl.current!.focus()
  }
  return (
    <Form
      onSubmit={async () => {
        const todoItems = await onNewTodo({ text })
        onTodoListUpdate(todoItems)
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
          await onClear()
          onTodoListUpdate([])
          focusInput()
        }}
      >
        Clear All
      </button>
    </Form>
  )
}
