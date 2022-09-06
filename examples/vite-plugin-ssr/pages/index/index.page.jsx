import React, { Suspense, useState, useEffect } from 'react'
import { TodoList } from './TodoList'

export { Page }

function Page() {
  return (
    <>
      <h1>To-do List</h1>
      <Timer />
      <Suspense fallback={<div>Loading...</div>}>
        <TodoList />
      </Suspense>
    </>
  )
}

function Timer() {
  const [counter, setCounter] = useState(0)
  useEffect(() => {
    setTimeout(() => {
      setCounter(counter + 1)
    }, 100)
  })
  return <p>(This page is interactive while data is loading: {counter})</p>
}
