import React from 'react'
import './Header.css'
import iconTelefunc from '../../icons/telefunc.svg'
import HeaderCodeBlockLeft from './HeaderCodeBlockLeft.mdx'
import HeaderCodeBlockRight from './HeaderCodeBlockRight.mdx'

export { Header }

function Header() {
  return (
    <CenterHorizontal>
      <div id="header">
        <LeftSide />
        <RightSide />
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ width: 465 }}>
          <HeaderCodeBlockLeft />
          <div style={{ textAlign: 'center' }}>
            <em>Node.js</em>
          </div>
        </div>
        <div style={{ width: 465, marginLeft: 10 }}>
          <HeaderCodeBlockRight />
          <div style={{ textAlign: 'center' }}>
            <em>Browser</em>
          </div>
        </div>
      </div>
    {/*
      <div style={{ display: 'inline-block' }}>
        <em>Define functions on the server, call them remotely from the browser.</em>
      </div>
    */}
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

function LeftSide() {
  return (
    <div id="header-left-side">
      <div
        id="header-logo"
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <img src={iconTelefunc} />
        <h1>Telefunc</h1>
      </div>
    </div>
  )
}

function RightSide() {
  return (
    <div id="header-right-side" style={{ marginLeft: 60, fontSize: '2em' }}>
      Remote Functions.
      <br />
      Instead of API.
    </div>
  )
}
