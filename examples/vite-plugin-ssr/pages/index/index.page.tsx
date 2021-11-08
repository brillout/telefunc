import React from 'react'
import { PageProps } from './index.page.server'
import { Auth, UserInfo } from './Auth'
import { TodoList } from './TodoList'

export { Page }

function Page(props: PageProps) {
  if (props.notLoggedIn) {
    return (
      <>
        <h1>Login</h1>
        <Auth userListInitial={props.userListInitial} />
      </>
    )
  }
  return (
    <>
      <h1>{props.user.name}'s to-do list</h1>
      <TodoList todoItemsInitial={props.todoItemsInitial} />
      <UserInfo user={props.user} />
    </>
  )
}
