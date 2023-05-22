/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["back.emonos.mn"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "back.emonos.mn",
        port: "",
        pathname: "/**",
      },
    ],
  },

  reactStrictMode: true,
};

module.exports = nextConfig;
