import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "fastly.picsum.photos",
      },
      {
        protocol: "https",
        hostname: "www.gulfepco.com",
      },
      {
        protocol: "https",
        hostname: "www.dreamdrivesdxb.com",
      },
      {
        protocol: "https",
        hostname: "www.convoflow.ae",
      },
      {
        protocol: "https",
        hostname: "advance-website.vercel.app",
      },
    ],
  },
};

export default nextConfig;
