import { drizzle as neonDrizzle } from "drizzle-orm/neon-serverless";
import { drizzle as pgDrizzle } from "drizzle-orm/postgres-js";

import * as schema from "./schemas";
import { env } from "@/env/server";

export const db =
  process.env.NODE_ENV === "development"
    ? pgDrizzle({
        connection: env.DATABASE_URL,
        casing: "snake_case",
        logger: true,
        schema,
      })
    : neonDrizzle({
        connection: env.DATABASE_URL,
        schema,
        logger: true,
        casing: "snake_case",
      });
