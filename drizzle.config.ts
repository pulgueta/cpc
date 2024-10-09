import { defineConfig } from "drizzle-kit";

import "dotenv/config";

import { env } from "@/env/server";

export default defineConfig({
  dialect: "postgresql",
  schema: "./db/schemas",
  out: "./drizzle",
  dbCredentials: {
    url: env.DATABASE_URL ?? "",
  },
});
