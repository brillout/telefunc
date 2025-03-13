import type { NextConfig } from 'next'
import withTelefunc from 'telefunc/next'

let nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
}
nextConfig = withTelefunc(nextConfig)

export default nextConfig
