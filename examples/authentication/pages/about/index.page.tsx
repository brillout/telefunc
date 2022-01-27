import React from 'react'

export { Page }

function Page() {
  return (
    <>
      <h1>About</h1>
      <p>This app showcases:</p>
      <ul>
        <li>RPC, with Telefunc.</li>
        <li>SSR, with vite-plugin-ssr.</li>
        <li>Authentication, with Telefunc's context SSR provisioning.</li>
      </ul>
    </>
  )
}
