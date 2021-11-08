import React, { useState, useEffect, useRef } from 'react'

export { Form }
export { SingleTextInputForm }

function useFocusInput() {
  const inputEl = useRef<HTMLInputElement>(null)
  const focusInput = () => {
    inputEl.current!.focus()
  }
  focusInput.inputEl = inputEl
  return focusInput
}
function SingleTextInputForm({
  onSubmit,
  submitButtonText,
  focusInput,
  children,
}: {
  onSubmit: (text: string) => Promise<void>
  submitButtonText: string
  focusInput?: ReturnType<typeof useFocusInput>
  children?: React.ReactNode
}) {
  focusInput = focusInput || useFocusInput()
  const [text, setText] = useState('')
  return (
    <Form
      onSubmit={async () => {
        await onSubmit(text)
        setText('')
      }}
      onAfterHydration={focusInput}
      onAfterSubmit={focusInput}
    >
      <input
        type="text"
        value={text}
        ref={focusInput.inputEl}
        onChange={(ev) => {
          setText(ev.target.value)
        }}
      />
      <button type="submit" style={{ margin: '0 10px' }}>
        {submitButtonText}
      </button>
      {children}
    </Form>
  )
}

function Form({
  children,
  onSubmit,
  onAfterSubmit,
  onAfterHydration,
}: {
  children: React.ReactNode
  onSubmit: () => Promise<void>
  onAfterSubmit: () => void
  onAfterHydration: () => void
}) {
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
