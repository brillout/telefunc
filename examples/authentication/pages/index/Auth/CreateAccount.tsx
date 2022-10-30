import React from 'react'
import { onCreateAccount } from './CreateAccount.telefunc'
import { TextInputForm } from '#app/components/forms/TextInputForm'
import { User } from '#app/db/User'

export { CreateAccount }

function CreateAccount({ onNewAccount }: { onNewAccount: (userList: User[]) => void }) {
  return (
    <TextInputForm
      onSubmit={async (text: string) => {
        const name = text
        const userList = await onCreateAccount(name)
        onNewAccount(userList)
      }}
      submitButtonText="Create Account"
    />
  )
}
