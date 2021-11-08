import React from 'react'

export { Page }

function Page() {
  return (
    <>
      <h1>About</h1>
      <p>This app showcases:</p>
      <ul>
        <li>RPC instead of API. (Using Telefunc.)</li>
        <li>SSR. (Using Vite + vite-plugin-ssr.)</li>
        <li>Authentication. (Using Telefunc's context provisioning.)</li>
      </ul>
    </>
  )
}
