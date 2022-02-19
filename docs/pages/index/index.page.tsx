import React from 'react'
import { Header } from './Header'
import { Features } from './features/Features'
import { ContactUs } from 'libframe-docs/landing-page/ContactUs'

export { Page }

function Page() {
  return (
    <>
      <Header />
      <div style={{ height: 30 }} />
      <Features />
      <div style={{ height: 30 }} />
      <ContactUs text="Have a question? Want a feature? Found a bug?" />
      <div style={{ height: 70 }} />
    </>
  )
}
