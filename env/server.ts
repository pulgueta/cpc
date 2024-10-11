import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    ARGON2_SECRET: z.string(),
    AUTH_SECRET: z.string(),
    CAPTCHA_SECRET_KEY: z.string(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    ARGON2_SECRET: process.env.ARGON2_SECRET,
    AUTH_SECRET: process.env.AUTH_SECRET,
    CAPTCHA_SECRET_KEY: process.env.CAPTCHA_SECRET_KEY,
  },
});
