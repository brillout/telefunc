import React from 'react'
import { User } from '#root/db/User'
import { Button } from '#root/components/forms/Button'
import { logout } from '#root/auth/client/session'

export { UserInfo }

function UserInfo({ user }: { user: User }) {
  return (
    <p>
      User: <b>{user.name}</b>. <Button onClick={() => logout()}>Logout</Button>
    </p>
  )
}
