import { AppLayout } from '@unterberg/nivel/client'
import type { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  return <AppLayout>{children}</AppLayout>
}

export default Layout
