import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // Emits dir/index.html so nested routes resolve on GitHub Pages.
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
