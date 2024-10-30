import type { NextConfig } from "next";

const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: !!process.env.CI,
  },
  typescript: {
    ignoreBuildErrors: !!process.env.CI,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
        pathname: "**",
      },
    ],
  },
  rewrites: async () => {
    return [
      {
        source: "/owner",
        destination: "/owner/sales",
      },
    ];
  },
  serverExternalPackages: ["@node-rs/argon2"],
  experimental: {},
} satisfies NextConfig;

export default nextConfig;
