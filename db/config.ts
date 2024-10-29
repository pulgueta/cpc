import { drizzle } from "drizzle-orm/neon-serverless";

import * as schema from "./schemas";
import { env } from "@/env/server";

export const db = drizzle({
  connection: env.DATABASE_URL,
  casing: "snake_case",
  logger: true,
  schema,
});
