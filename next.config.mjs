/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
    ],
  },
  async redirects() {
    return [
      { source: '/home', destination: '/', permanent: true },
      { source: '/Education', destination: '/education', permanent: true },
      { source: '/Skills', destination: '/skills', permanent: true },
      { source: '/Projects', destination: '/projects', permanent: true },
    ];
  },
};

export default nextConfig;