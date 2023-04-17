/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ['files.stripe.com', 'avatars.githubusercontent.com'],
  },
}

module.exports = nextConfig
