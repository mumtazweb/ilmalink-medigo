/** @type {import('next').NextConfig} */
const serverActionAllowedOrigins = [
  "ilmalink.com",
  "www.ilmalink.com",
  "mbbs.ilmalink.com",
  "*.ilmalink.com",
  "*.vercel.app",
  "localhost:3000",
  "127.0.0.1:3000",
];

const nextConfig = {
  async redirects() {
    return [
      {
        source: "/student-alert",
        destination: "/alert/",
        permanent: true,
      },
      {
        source: "/student-alert/",
        destination: "/alert/",
        permanent: true,
      },
    ];
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: serverActionAllowedOrigins,
      bodySizeLimit: "100mb",
    },
    proxyClientMaxBodySize: "100mb",
  },
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
