import React from 'react'
import { onNewTodo, onClear } from './NewTodo.telefunc'
import { TextInputForm, useFocusInput } from '../utils/TextInputForm'
import { TodoItem } from '../../../db'

export { NewTodo }

function NewTodo({ onTodoListUpdate }: { onTodoListUpdate: (todoItems: TodoItem[]) => void }) {
  const focusInput = useFocusInput()
  return (
    <TextInputForm
      onSubmit={async (text) => {
        const todoItems = await onNewTodo({ text })
        onTodoListUpdate(todoItems)
      }}
      submitButtonText="Add To-do"
      focusInput={focusInput}
    >
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
    </TextInputForm>
  )
}
