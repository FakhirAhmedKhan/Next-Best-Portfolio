/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,

  // Required for GitHub Pages
  output: "export",
  basePath: "/Next-Best-Portfolio",
  images: { unoptimized: true },

  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/EducationTimeline", destination: "/education", permanent: true },
      { source: "/SkillPage", destination: "/skills", permanent: true },
      { source: "/ProjectPage", destination: "/projects", permanent: true },
      {
        source: "/Certifications",
        has: [{ type: "query", key: "fix", value: "1", optional: true }],
        destination: "/certifications",
        permanent: true,
      }
    ];
  },
};

export default nextConfig;
