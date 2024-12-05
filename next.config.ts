import type { NextConfig } from "next";

import { next } from "@million/lint";

import { env } from "@/env/server";
import { env as client } from "@/env/client";

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
        hostname: client.NEXT_PUBLIC_CLOUDFLARE_R2.replace("https://", ""),
        pathname: "**",
      },
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
  serverExternalPackages: ["@node-rs/argon2"],
  webpack: (config) => {
    config.externals = [...config.externals, "@node-rs/argon2"];

    return config;
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
      allowedOrigins: [env.SITE_URL, "http://localhost:3000", `https://${env.VERCEL_URL}`],
    },
  },
} satisfies NextConfig;

export default next({ rsc: true })(nextConfig);
