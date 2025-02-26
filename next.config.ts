/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { hostname: 'localhost' },
      {
        hostname: 'via.placeholder.com',
      },
      {
        hostname: 'seconds-space-fork.sgp1.digitaloceanspaces.com',
      },
      {
        hostname: 'sandbox.goship.io',
      },
      {
        hostname: 'api.vietqr.io',
      },
      {
        hostname: 'vietqr.net',
      },
      {
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};

export default nextConfig;
