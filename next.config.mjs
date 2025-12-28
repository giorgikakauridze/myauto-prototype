/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.my.ge",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
