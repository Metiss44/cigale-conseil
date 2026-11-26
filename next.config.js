const { initOpenNextCloudflareForDev } = require('@opennextjs/cloudflare');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.cigaleconseil.fr' },
      { protocol: 'https', hostname: 'cdn.matisscottard.com' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/nos-offres',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/nos-offres/',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/simulateurs/auto-entrepreneur',
        destination: '/simulateurs/entreprise-individuelle',
        permanent: true,
      },
      {
        source: '/simulateurs/auto-entrepreneur/',
        destination: '/simulateurs/entreprise-individuelle',
        permanent: true,
      },
      {
        source: '/a-propos',
        destination: '/parcours',
        permanent: true,
      },
      {
        source: '/a-propos/',
        destination: '/parcours',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/#contact',
        permanent: true,
      },
      {
        source: '/contact/',
        destination: '/#contact',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig

if (process.env.NODE_ENV === "development") initOpenNextCloudflareForDev();
