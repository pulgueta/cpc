import { seed } from "drizzle-seed";

import "dotenv/config";

import { db } from "./config";
import * as schema from "./schemas";

const main = async () => await seed(db, schema, { count: 10 });

main();
