import { Redis } from "@upstash/redis";

import { env } from "@/env/server";

export const cache = new Redis({
  url: env.UPSTASH_REDIS_URL,
  token: env.UPSTASH_REDIS_TOKEN,
});
