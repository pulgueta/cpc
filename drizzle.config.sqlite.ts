import { defineConfig } from "drizzle-kit";

import "dotenv/config";

import { env } from "@/env/server";

export default defineConfig({
  dialect: "turso",
  dbCredentials: {
    url: env.TURSO_DATABASE_URL,
    authToken: env.TURSO_AUTH_TOKEN,
  },
  casing: "snake_case",
  out: "./turso",
  schema: "./db/schemas/turso",
  strict: true,
  verbose: true,
});
