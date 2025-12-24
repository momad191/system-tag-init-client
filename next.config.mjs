import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();

/** @type {import("next").NextConfig} */

const baseConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // allows all external hosts (not recommended for strict apps)
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com/w40/sa.png",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com/w40/gb.png",
      },
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },

      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
      {
        protocol: "https",
        hostname: "pub-b7fd9c30cdbf439183b75041f5f71b92.r2.dev",
        port: "",
      },
    ],
  },
};

const nextConfig = withNextIntl(baseConfig);

export default nextConfig;
