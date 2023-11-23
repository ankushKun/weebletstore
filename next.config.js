/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.discordapp.com', 'cdn.discord.com', 'media.discordapp.net'],
  },
}

module.exports = nextConfig
