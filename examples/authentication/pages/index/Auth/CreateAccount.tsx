import React from 'react'
import { TextInputForm } from '#app/components/forms/TextInputForm'
import { User } from '#app/db/User'
import { onCreateAccount } from './CreateAccount.telefunc'

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
