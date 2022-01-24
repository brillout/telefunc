import React from 'react'
import './HeaderCode.css'
import HeaderCodeBlockLeft from './HeaderCodeBlockLeft.mdx'
import HeaderCodeBlockRight from './HeaderCodeBlockRight.mdx'

export { HeaderCode }

function HeaderCode() {
  return (
    <div id="header-code-wrapper">
      <div className="header-code-block">
        <HeaderCodeBlockLeft />
        <div className="header-code-description">
          <em>Server</em>
        </div>
      </div>
      <div className="header-code-block" style={{ marginLeft: 10 }}>
        <HeaderCodeBlockRight />
        <div className="header-code-description">
          <em>Browser</em>
        </div>
      </div>
    </div>
  )
}
