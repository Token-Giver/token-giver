/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "token-giver-backend-production.up.railway.app",
        port: "",
        pathname: "//images/**"
      }
    ]
  }
};

export default nextConfig;
