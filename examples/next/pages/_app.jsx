import { config } from 'telefunc/client'

config.telefuncUrl = '/api/_telefunc'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
