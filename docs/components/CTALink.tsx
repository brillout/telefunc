import React from 'react'

export function CTALink({
  href,
  variant,
  size,
  children,
}: {
  href: string
  /** @default 'primary' */
  variant?: 'primary' | 'secondary'
  /** @default 'default' */
  size?: 'default' | 'lg'
  children: React.ReactNode
}) {
  const theme =
    variant === 'secondary'
      ? {
          backgroundColor: 'var(--color-text)',
          color: '#eee',
        }
      : {
          backgroundColor: 'rgb(247, 224, 24)',
          color: 'var(--color-text)',
        }

  const something =
    size === 'lg'
      ? {
          padding: '16px 32px',
          letterSpacing: '0.05em',
          lineHeight: 1.3,
        }
      : {
          padding: '8px 16px',
          letterSpacing: '0.05em',
          lineHeight: 1.3,
        }

  const fontSize = size === 'lg' ? 20 : 16

  const fontWeight = size === 'lg' ? 700 : 600

  return (
    <a
      href={href}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          marginTop: -6,
          marginBottom: 6,
          overflow: 'hidden',
          border: '1px solid #d1d5db',
          borderRadius: 6,
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12)',
          fontSize,
          fontWeight,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            ...something,
            ...theme,
          }}
        >
          {children}
        </div>
      </div>
    </a>
  )
}
