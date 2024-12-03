import { drizzle } from "drizzle-orm/neon-http";
import { drizzle as tursodb } from "drizzle-orm/libsql";
import { neon } from "@neondatabase/serverless";
import { createClient } from "@libsql/client";

import * as schema from "./schemas";
import * as tursoSchemas from "./schemas/turso";
import { env } from "@/env/server";

const tursoClient = createClient({
  url: env.TURSO_DATABASE_URL,
  authToken: env.TURSO_AUTH_TOKEN,
});

const sql = neon(env.DATABASE_URL);

export const turso = tursodb(tursoClient, {
  schema: tursoSchemas,
  logger: true,
  casing: "snake_case",
});

export const db = drizzle({
  client: sql,
  schema,
  logger: true,
  casing: "snake_case",
});
