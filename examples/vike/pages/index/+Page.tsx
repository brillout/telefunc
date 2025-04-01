export { Page }

import React, { useState } from 'react'
import { TodoList } from './TodoList'

function Page() {
  return (
    <>
      <h1>To-do List</h1>
      <TodoList />
      <Counter />
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
