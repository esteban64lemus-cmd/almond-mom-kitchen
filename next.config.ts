import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // /mission is the About page; keep /about as a stable URL for directories and bios.
  async redirects() {
    return [
      { source: "/about", destination: "/mission", permanent: true },
      // Old recipe slugs renamed when health claims were removed.
      { source: "/blog/bone-broth-detox-soup", destination: "/blog/bone-broth-soup", permanent: true },
      { source: "/blog/lemon-water-detox", destination: "/blog/lemon-acv-morning-drink", permanent: true },
    ];
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
