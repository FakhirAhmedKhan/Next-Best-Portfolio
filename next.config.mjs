/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 👈 Enables static HTML export
  images: {
    unoptimized: true, // 👈 Required for GitHub Pages (no Next Image Optimization)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
    ],
  },
  basePath: '/Next-Best-Portfolio', // 👈 your repo name
  assetPrefix: '/Next-Best-Portfolio/', // 👈 same as basePath
};

export default nextConfig;