import { createEnv } from "@t3-oss/env-nextjs";
import { vercel } from "@t3-oss/env-nextjs/presets";
import { string } from "zod";

export const env = createEnv({
  server: {
    BETTER_AUTH_SECRET: string(),
    BETTER_AUTH_URL: string().url(),
    ARGON2_SECRET: string(),
    DATABASE_URL: string().url(),
    CAPTCHA_SECRET_KEY: string(),
    RESEND_API_KEY: string(),
    UPSTASH_REDIS_URL: string().url(),
    UPSTASH_REDIS_TOKEN: string(),
    SITE_URL: string().url(),
    FROM_EMAIL: string().email(),
    GOOGLE_CLIENT_SECRET: string(),
    TURSO_DATABASE_URL: string().url(),
    TURSO_AUTH_TOKEN: string(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    CAPTCHA_SECRET_KEY: process.env.CAPTCHA_SECRET_KEY,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    ARGON2_SECRET: process.env.ARGON2_SECRET,
    UPSTASH_REDIS_URL: process.env.UPSTASH_REDIS_URL,
    UPSTASH_REDIS_TOKEN: process.env.UPSTASH_REDIS_TOKEN,
    SITE_URL: process.env.SITE_URL,
    FROM_EMAIL: process.env.FROM_EMAIL,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    TURSO_DATABASE_URL: process.env.TURSO_DATABASE_URL,
    TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN,
  },
  extends: [vercel()],
});
