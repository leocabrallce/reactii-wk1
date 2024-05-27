/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        port: "",
        pathname: "/**",
      },
    ],
    minimumCacheTTL: 10 * 60, // 10 minutes
  },
};

module.exports = nextConfig;
