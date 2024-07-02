import React from 'react'
import { useData } from 'telefunc/react-streaming'
import { Auth, UserInfo } from './Auth'
import { ClearCookies } from './ClearCookies'
import { onLoad } from './Page.telefunc'
import { TodoList } from './TodoList'

export { Page }

function Page() {
  const data = useData(onLoad)
  if (data.notLoggedIn) {
    return (
      <>
        <h1>Login</h1>
        <Auth userListInitial={data.userListInitial} />
      </>
    )
  }
  return (
    <>
      <h1>{data.user.name}'s to-do list</h1>
      <TodoList todoItemsInitial={data.todoItemsInitial} />
      <br />
      <UserInfo user={data.user} />
      <ClearCookies />
    </>
  )
}
