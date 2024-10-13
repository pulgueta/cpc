import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";

import * as schema from "./schemas";
import { env } from "@/env/server";

const client = new Pool({ connectionString: env.DATABASE_URL, max: 1 });

export const db = drizzle(client, { logger: true, schema });
