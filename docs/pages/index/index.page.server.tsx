import React from 'react'
import { Header } from './Header'
import { CodePreview } from './CodePreview'
import { Features } from './features/Features'
import { ContactUs } from '@brillout/docpress'

export { Page }

function Page() {
  return (
    <>
      <Header />
      <CodePreview />
      <div style={{ height: 30 }} />
      <Features />
      <div style={{ height: 30 }} />
      <ContactUs text="Have a question? Want a feature? Found a bug?" />
      <div style={{ height: 70 }} />
    </>
  )
}
