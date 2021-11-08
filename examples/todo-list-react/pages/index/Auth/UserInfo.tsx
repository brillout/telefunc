import React from 'react'
import { User } from '../../../db/User'
import { Button } from '../utils/TextInputForm'
import { logout } from '../../../auth/client/session'

export { UserInfo }

function UserInfo({ user }: { user: User }) {
  return (
    <p>
      User: <b>{user.name}</b>. <Button onClick={() => logout()}>Logout</Button>
    </p>
  )
}
