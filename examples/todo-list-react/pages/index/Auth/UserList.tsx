import React from 'react'
import { User } from '../../../db/User'
import { Button } from '../utils/TextInputForm'
import { signin } from '../../../auth/client/session'

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
          Login as {user.name}
        </Button>
      ))}
    </p>
  )
}
