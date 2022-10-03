import React from 'react'
import './CodePreview.css'
import CodePreviewBlockLeft from './CodePreviewBlockLeft.mdx'
import CodePreviewBlockRight from './CodePreviewBlockRight.mdx'

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
          <CodePreviewBlockLeft />
          <div className="code-preview_code-block_description">
            <em>Server</em>
          </div>
        </div>
        <div className="code-preview_code-block code-preview_code-block_right">
          <CodePreviewBlockRight />
          <div className="code-preview_code-block_description">
            <em>Browser</em>
          </div>
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
        flexDirection: 'column'
      }}
    >
      {children}
    </div>
  )
}
