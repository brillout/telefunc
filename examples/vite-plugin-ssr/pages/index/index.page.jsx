import React from 'react'
import { TodoList } from './TodoList'

export { Page }

function Page(props) {
  const title = `${props.user.name}'s to-do list`
  return (
    <>
      <h1>{title}</h1>
      <TodoList todoItemsInitial={props.todoItemsInitial} />
    </>
  )
}
