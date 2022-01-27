export { UserInfo }

import React from 'react'
import { User } from '#app/db/User'
import { Button } from '#app/components/forms/Button'
import { logout } from '#app/auth/client'

function UserInfo({ user }: { user: User }) {
  return (
    <p>
      User: <b>{user.name}</b>. <Button onClick={() => logout()}>Logout</Button>
    </p>
  )
}
