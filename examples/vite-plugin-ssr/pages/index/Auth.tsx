import React, { useState } from 'react'
import { User } from '../../db/User'
import { createAccount } from './Auth.telefunc'
import { SingleTextInputForm } from './TodoList/Form'

export { Auth }
export { UserInfo }

function Auth({ userListInitial }: { userListInitial: User[] }) {
  const [userList, setUserList] = useState(userListInitial)
  return (
    <>
      <CreateAccount
        onNewAccount={(userList) => {
          setUserList(userList)
        }}
      />
      <div>{userList.map((user) => user.name)}</div>
    </>
  )
}

function CreateAccount({ onNewAccount }: { onNewAccount: (userList: User[]) => void }) {
  return (
    <SingleTextInputForm
      onSubmit={async (name: string) => {
        const userList = await createAccount(name)
        onNewAccount(userList)
      }}
      submitButtonText="Create Account"
    />
  )
}

function UserInfo({ user }: { user: User }) {
  return (
    <>
      <p>Logged User: {user.name}</p>
    </>
  )
}
