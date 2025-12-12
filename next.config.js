/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.cigaleconseil.fr', 'cdn.matisscottard.com'],
  },
}

module.exports = nextConfig
