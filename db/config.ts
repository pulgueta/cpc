import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./schemas";
import { env } from "@/env/server";

const client = neon(env.DATABASE_URL);

export const db = drizzle(client, { logger: true, schema });
