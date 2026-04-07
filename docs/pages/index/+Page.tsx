export { Page }

import React from 'react'
import { Header } from './Header'
import { Features } from './features/Features'
import { Quickstart } from './quick-start/QuickStart'
import { CodeComparison } from '../../components/CodeComparison'
import CodePreviewBlockServer from './CodePreviewBlockServer.mdx'
import CodePreviewBlockBrowser from './CodePreviewBlockBrowser.mdx'

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
        <CodeComparison headings={['Called in the browser,', 'Run on the server.']}>
          <CodePreviewBlockBrowser />
          <CodePreviewBlockServer />
        </CodeComparison>
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
