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
      {
        protocol: "https",
        hostname: "centro-popular-comercial.s3.us-east-1.amazonaws.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "d3a4t9acvuthif.cloudfront.net",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "2b40aceba757bc0bb19264ff9f0b763e.r2.cloudflarestorage.com",
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
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
  serverExternalPackages: ["@node-rs/argon2", "argon2"],
  webpack: (config) => {
    config.externals = [...config.externals, "@node-rs/argon2"];

    return config;
  },
} satisfies NextConfig;

export default nextConfig;
