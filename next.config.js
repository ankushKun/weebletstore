/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "cdn.discordapp.com",
      "cdn.discord.com",
      "media.discordapp.net",
      "media.tenor.com",
      "lh3.googleusercontent.com",
      "googleusercontent.com",
    ],
  },
};

module.exports = nextConfig;
