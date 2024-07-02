import React from 'react'
import { signin } from '#app/auth/client'
import { Button } from '#app/components/forms/Button'
import { User } from '#app/db/User'

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
