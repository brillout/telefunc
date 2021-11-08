import React from 'react'
import { User } from '../../../db/User'
import { logout } from './session'

export { UserInfo }

function UserInfo({ user }: { user: User }) {
  return (
    <p>
      User: <b>{user.name}</b>.{' '}
      <button onClick={() => logout()} style={{ display: 'inline-block' }}>
        Logout
      </button>
    </p>
  )
}
