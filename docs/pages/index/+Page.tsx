export { Page }

import React from 'react'
import { CodePreview } from './CodePreview'
import { ContactUs } from './ContactUs'
import { Header } from './Header'
import { Features } from './features/Features'

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
