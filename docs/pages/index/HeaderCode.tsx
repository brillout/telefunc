import React from 'react'
import './HeaderCode.css'
import HeaderCodeBlockLeft from './HeaderCodeBlockLeft.mdx'
import HeaderCodeBlockRight from './HeaderCodeBlockRight.mdx'

export { HeaderCode }

function HeaderCode() {
  return (
    <div
      id="header-code-wrapper"
      className={[
        /*
        'debug-layout',
        //*/
      ].join(' ')}
    >
      <div className="header-code-block">
        <HeaderCodeBlockLeft />
        <div className="header-code-description">
          <em>Server</em>
        </div>
      </div>
      <div className="header-code-block header-code-block-right">
        <HeaderCodeBlockRight />
        <div className="header-code-description">
          <em>Browser</em>
        </div>
      </div>
    </div>
  )
}
