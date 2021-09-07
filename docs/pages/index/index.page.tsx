import React from 'react'
import { Header } from './Header'
import { Features } from './features/Features'
import { ContactUs } from 'libframe-docs/landing-page/ContactUs'
import { HorizontalLine } from 'libframe-docs/landing-page/HorizontalLine'

export { Page }

function Page() {
  return (
    <>
      <Header />
      <HorizontalLine primary={true} />
      <Features />
      <HorizontalLine />
      <ContactUs githubRepoName="brillout/telefunc" discordInvite="3DYWwk4xRQ" />
      <div style={{ height: 70 }} />
    </>
  )
}
