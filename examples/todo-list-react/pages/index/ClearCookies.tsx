export { ClearCookies }

import React from 'react'
import { clearCookies as clear } from '#app/auth/client/cookie'
import { Button } from '#app/components/forms/Button'

function ClearCookies() {
  return (
    <p>
      <Button onClick={clear}>Clear Cookies</Button>(Then try to add a to-do item.)
    </p>
  )
}
