import React from 'react'
import './CodePreview.css'
import CodePreviewBlockServer from './CodePreviewBlockServer.mdx'
import CodePreviewBlockBrowser from './CodePreviewBlockBrowser.mdx'

export { CodePreview }

function CodePreview() {
  return (
    <CenterHorizontal>
      <div
        id="code-preview-wrapper"
        className={[
          /*
          'debug-layout',
          //*/
        ].join(' ')}
      >
        <div className="code-preview_code-block">
          <div className="code-preview_code-block_description">
            <em>Called in the browser,</em>
          </div>
          <CodePreviewBlockBrowser />
        </div>
        <div className="code-preview_code-block code-preview_code-block_right">
          <div className="code-preview_code-block_description">
            <em>Run on the server.</em>
          </div>
          <CodePreviewBlockServer />
        </div>
      </div>
    </CenterHorizontal>
  )
}

function CenterHorizontal({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      {children}
    </div>
  )
}
