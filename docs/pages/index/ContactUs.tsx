export { ContactUs }

import React from 'react'
import { projectInfo } from '../../utils/projectInfo'
import './ContactUs.css'

function ContactUs() {
  return (
    <p id="contact-us">
      Have a question? Want a feature? Found a bug? <a href={projectInfo.discordInvite}>Join our Discord</a> or{' '}
      <a href={projectInfo.githubIssues}>open a GitHub ticket</a>.
    </p>
  )
}
