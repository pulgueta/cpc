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
} satisfies NextConfig;

export default nextConfig;
