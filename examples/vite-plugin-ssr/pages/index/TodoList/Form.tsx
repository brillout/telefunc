import React, { useState, useEffect } from 'react'

export { Form }

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
