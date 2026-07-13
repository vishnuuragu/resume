import type { NextConfig } from "next";

// NEXT_PUBLIC_BASE_PATH is set to "/resume" by the GitHub Pages workflow
// (project pages are served from https://<user>.github.io/<repo>/).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;
