/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Helps catch bugs early
  compress: true, // Enables gzip compression
  poweredByHeader: false, // Removes "X-Powered-By" header for security
  productionBrowserSourceMaps: false, // Skip source maps in production (smaller build)

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
    ],
  },

  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/Education", destination: "/education", permanent: true },
      { source: "/Skills", destination: "/skills", permanent: true },
      { source: "/Projects", destination: "/projects", permanent: true },
      {source:"/certifications",destination:"/certifications",permanent:true},
    ];
  },
};

export default nextConfig;
