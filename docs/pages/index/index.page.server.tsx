import React from 'react'
import { Header } from './Header'
import { CodePreview } from './CodePreview'
import { Features } from './features/Features'
import { ContactUs } from './ContactUs'

export { Page }

function Page() {
  return (
    <>
      <Header />
      <CodePreview />
      <div style={{ height: 30 }} />
      <Features />
      <div style={{ height: 30 }} />
      <ContactUs />
      <div style={{ height: 70 }} />
    </>
  )
}
