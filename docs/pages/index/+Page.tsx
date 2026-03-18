export { Page }

import React from 'react'
import { Header } from './Header'
import { CodePreview } from './CodePreview'
import { Features } from './features/Features'
import { Quickstart } from './quick-start/QuickStart'

function Page() {
  return (
    <>
      <div
        style={{
          background: 'var(--color-bg-gray)',
          paddingTop: 50,
          paddingBottom: 40,
        }}
      >
        <Header />
        <CodePreview />
      </div>
      <div
        style={{
          background: 'var(--color-bg-gray)',
          marginTop: 'var(--block-margin)',
          paddingTop: 20,
          paddingBottom: 20,
        }}
      >
        <Features />
      </div>
      <div
        style={{
          background: 'var(--color-bg-gray)',
          marginTop: 'var(--block-margin)',
          paddingTop: 20,
          paddingBottom: 120,
        }}
      >
        <Quickstart />
      </div>
    </>
  )
}
