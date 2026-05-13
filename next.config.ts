import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Fix workspace root detection when there's a package-lock.json higher up
  outputFileTracingRoot: path.resolve(__dirname),
};

export default nextConfig;
