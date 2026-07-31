import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages only serves static files. GitHub Actions sets this variable
  // while building, so assets work from /NickyJ/ after deployment.
  output: "export",
  basePath: process.env.GITHUB_ACTIONS === "true" ? "/NickyJ" : "",
  reactStrictMode: true,
  turbopack: {
    root: __dirname,
  },
  images: {
    // GitHub Pages cannot run Next.js's server-side image optimizer.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
