import React from 'react'
import { User } from '../../../db/User'
import { Button } from '../utils/TextInputForm'
import { signin } from './session'

export { UserList }

function UserList({ userList }: { userList: User[] }) {
  return (
    <p>
      {userList.map((user) => (
        <Button
          key={user.id}
          onClick={() => {
            signin(user.id)
          }}
        >
          Log-in as {user.name}
        </Button>
      ))}
    </p>
  )
}
