import React from 'react'
import { createAccount } from './CreateAccount.telefunc'
import { TextInputForm } from '#root/components/forms/TextInputForm'
import { User } from '#root/db/User'

export { CreateAccount }

function CreateAccount({ onNewAccount }: { onNewAccount: (userList: User[]) => void }) {
  return (
    <TextInputForm
      onSubmit={async (text: string) => {
        const name = text
        const userList = await createAccount(name)
        onNewAccount(userList)
      }}
      submitButtonText="Create Account"
    />
  )
}
