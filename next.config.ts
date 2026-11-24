import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // /mission is the About page; keep /about as a stable URL for directories and bios.
  async redirects() {
    return [{ source: "/about", destination: "/mission", permanent: true }];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
