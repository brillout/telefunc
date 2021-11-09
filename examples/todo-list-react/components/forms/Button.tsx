import React, { useState, useEffect } from 'react'

export { Button }

function Button({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  const [disabled, setDisable] = useState(true)
  useEffect(() => {
    setDisable(false)
  }, [])
  return (
    <button onClick={() => onClick()} style={{ display: 'inline-block', marginRight: 7 }} disabled={disabled}>
      {children}
    </button>
  )
}
