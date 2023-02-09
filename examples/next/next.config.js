const withTelefunc = require('telefunc/next').default

/** @type {import('next').NextConfig} */
const nextConfig = withTelefunc({
  reactStrictMode: true,
})

module.exports = nextConfig
