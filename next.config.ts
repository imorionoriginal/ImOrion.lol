import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/ImOrion.lol',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
