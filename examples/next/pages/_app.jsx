import { config as telefuncConfig } from 'telefunc/client'

telefuncConfig.telefuncUrl = '/api/_telefunc'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
