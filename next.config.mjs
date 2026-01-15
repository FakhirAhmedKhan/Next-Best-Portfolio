/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,

  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/EducationTimeline", destination: "/education", permanent: true },
      { source: "/SkillPage", destination: "/skills", permanent: true },
      { source: "/ProjectPage", destination: "/projects", permanent: true },
      {
        source: "/Certifications",
        destination: "/certifications",
        permanent: true,
      }
    ];
  },
};

export default nextConfig;
