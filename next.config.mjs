/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enables static HTML export
  images: {
    unoptimized: true, // GitHub Pages can't handle Next.js image optimization
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
    ],
  },
  basePath: '/Next-Best-Portfolio', // ✅ Your GitHub repo name
  assetPrefix: '/Next-Best-Portfolio/', // ✅ Same as basePath
  trailingSlash: true, // ✅ Recommended for GitHub Pages to prevent routing 404s
};

export default nextConfig;