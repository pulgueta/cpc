import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    ARGON2_SECRET: z.string(),
    AUTH_SECRET: z.string(),
    CAPTCHA_SECRET_KEY: z.string(),
    RESEND_API_KEY: z.string(),
    UPSTASH_REDIS_URL: z.string().url(),
    UPSTASH_REDIS_TOKEN: z.string(),
    SITE_URL: z.string().url(),
    FROM_EMAIL: z.string().email(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    ARGON2_SECRET: process.env.ARGON2_SECRET,
    AUTH_SECRET: process.env.AUTH_SECRET,
    CAPTCHA_SECRET_KEY: process.env.CAPTCHA_SECRET_KEY,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    UPSTASH_REDIS_URL: process.env.UPSTASH_REDIS_URL,
    UPSTASH_REDIS_TOKEN: process.env.UPSTASH_REDIS_TOKEN,
    SITE_URL: process.env.SITE_URL,
    FROM_EMAIL: process.env.FROM_EMAIL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  },
});
