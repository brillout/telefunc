export { UserInfo }

import React from 'react'
import { logout } from '#app/auth/client'
import { Button } from '#app/components/forms/Button'
import type { User } from '#app/db/User'

function UserInfo({ user }: { user: User }) {
  return (
    <p>
      <Button onClick={() => logout()}>Logout</Button>(Logged-in as <b>{user.name}</b>)
    </p>
  )
}
