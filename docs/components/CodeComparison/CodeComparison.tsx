import React from 'react'
import './CodeComparison.css'

export { CodeComparison, CodeComparisonLeft, CodeComparisonRight }

function CodeComparison({ children }: { children: [React.ReactNode, React.ReactNode] }) {
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
        {children}
      </div>
    </CenterHorizontal>
  )
}

function CodeComparisonLeft({ children }: { children: React.ReactNode }) {
  return <div className="code-preview_code-block">{children}</div>
}

function CodeComparisonRight({ children }: { children: React.ReactNode }) {
  return <div className="code-preview_code-block code-preview_code-block_right">{children}</div>
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
