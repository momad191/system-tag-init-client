const path = require('path')
import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: path.join(__dirname, '..'),
  },
  images: {
    qualities: [75, 100],
  }
};

export default nextConfig;
