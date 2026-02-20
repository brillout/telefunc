export { Page }

import React, { useState } from 'react'
import { Hello } from './Hello'
import { FileUpload } from './FileUpload'

function Page() {
  return (
    <>
      <h1>Welcome</h1>
      <Counter />
      <Hello />
      <FileUpload />
    </>
  )
}

function Counter() {
  const [count, setCount] = useState(0)
  return (
    <div>
      This page is interactive:
      <button type="button" onClick={() => setCount((count) => count + 1)}>
        Counter {count}
      </button>
    </div>
  )
}
