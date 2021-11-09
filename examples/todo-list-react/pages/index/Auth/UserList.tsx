import React from 'react'
import { User } from '#root/db/User'
import { Button } from '#root/components/forms/Button'
import { signin } from '#root/auth/client/session'

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
