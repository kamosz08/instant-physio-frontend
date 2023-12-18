/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        // pathname: '/account123/**',
      },
    ],
  },
};

module.exports = nextConfig;
