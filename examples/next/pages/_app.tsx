export default MyApp

import { config } from 'telefunc/client'
import type { AppProps } from 'next/app'
import React from 'react'

const isBrowser = typeof window !== 'undefined'
if (isBrowser) {
  config.telefuncUrl = '/api/_telefunc'
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
