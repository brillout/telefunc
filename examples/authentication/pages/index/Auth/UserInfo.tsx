export { UserInfo }

import React from 'react'
import type { User } from '#app/db/User'
import { Button } from '#app/components/forms/Button'
import { logout } from '#app/auth/client'

function UserInfo({ user }: { user: User }) {
  return (
    <p>
      <Button onClick={() => logout()}>Logout</Button>(Logged-in as <b>{user.name}</b>)
    </p>
  )
}
