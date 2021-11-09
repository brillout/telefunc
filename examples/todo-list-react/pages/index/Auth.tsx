import React, { useState } from 'react'
import { User } from '#root/db/User'
import { CreateAccount } from './Auth/CreateAccount'
import { UserList } from './Auth/UserList'

export { Auth }
export { UserInfo } from './Auth/UserInfo'

function Auth({ userListInitial }: { userListInitial: User[] }) {
  const [userList, setUserList] = useState(userListInitial)
  const onNewAccount = (userList: User[]) => {
    setUserList(userList)
  }
  return (
    <>
      <CreateAccount onNewAccount={onNewAccount} />
      <UserList userList={userList} />
    </>
  )
}
