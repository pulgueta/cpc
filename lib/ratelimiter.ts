import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import { env } from "@/env/server";

export const ratelimit = new Ratelimit({
  redis: new Redis({
    url: env.UPSTASH_REDIS_URL,
    token: env.UPSTASH_REDIS_TOKEN,
  }),
  limiter: Ratelimit.slidingWindow(5, "10 s"),
});

export const checkRateLimit = async (key: string, ip?: string | undefined) => {
  const { success } = await ratelimit.limit(key, { ip: ip ?? key });

  return {
    exceeded: !success,
  };
};
