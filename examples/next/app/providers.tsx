'use client'

import { config } from 'telefunc/client'

config.telefuncUrl = '/api/telefunc'

export function Providers({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
