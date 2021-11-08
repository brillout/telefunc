import React from 'react'
import { User } from '../../../db/User'
import { signin } from './session'

export { UserList }

function UserList({ userList }: { userList: User[] }) {
  return (
    <p>
      {userList.map((user) => (
        <button
          key={user.id}
          onClick={() => {
            signin(user.id)
          }}
          style={{ marginRight: 7 }}
        >
          Log-in as {user.name}
        </button>
      ))}
    </p>
  )
}
