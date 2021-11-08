import React from 'react'
import { PageProps } from './index.page.server'
import { TodoList } from './TodoList'

export { Page }

function Page(props: PageProps) {
  return (
    <>
      <h1>{props.user.name}'s to-do list</h1>
      <TodoList todoItemsInitial={props.todoItemsInitial} />
      <p>Logged User: {props.user.name}</p>
    </>
  )
}
