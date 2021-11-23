import { config } from 'telefunc/client'
import { AppProps } from 'next/app'

config.baseUrl = '/api/_telefunc'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
