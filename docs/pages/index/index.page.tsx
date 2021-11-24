import React from 'react'
import { Header } from './Header'
import { Features } from './features/Features'
import { ContactUs } from 'libframe-docs/landing-page/ContactUs'
import { HorizontalLine } from 'libframe-docs/landing-page/HorizontalLine'
import { projectInfo } from '../../utils'

export { Page }

function Page() {
  return (
    <>
      <Header />
      <HorizontalLine primary={true} />
      <Features />
      <HorizontalLine />
      <ContactUs githubRepository={projectInfo.githubRepository} discordInvite={projectInfo.discordInvite} />
      <div style={{ height: 70 }} />
    </>
  )
}
