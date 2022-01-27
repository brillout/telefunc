import React from 'react'
import { User } from '#app/db/User'
import { Button } from '#app/components/forms/Button'
import { signin } from '#app/auth/client'

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
