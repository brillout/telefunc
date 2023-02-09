/** @type {import('next').NextConfig} */
let nextConfig = {
  reactStrictMode: true
}

// Telefunc
const withTelefunc = require('telefunc/next').default
nextConfig = withTelefunc(nextConfig)

module.exports = nextConfig
