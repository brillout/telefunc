import React from 'react'
import { Auth, UserInfo } from './Auth'
import { TodoList } from './TodoList'
import { ClearCookies } from './ClearCookies'
import { useData } from 'telefunc/react'
import { loadData } from './Page.telefunc'

export { Page }

function Page() {
  const data = useData(loadData)
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
