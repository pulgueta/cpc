import { createEnv } from "@t3-oss/env-nextjs";
import { string } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_CAPTCHA_SITE_KEY: string(),
    NEXT_PUBLIC_SITE_URL: string().url(),
    NEXT_PUBLIC_S3_BUCKET: string(),
    NEXT_PUBLIC_S3_REGION: string(),
    NEXT_PUBLIC_S3_PUBLIC: string(),
    NEXT_PUBLIC_S3_SECRET: string(),
    NEXT_PUBLIC_CLOUDFRONT_URL: string().url(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_CAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_S3_BUCKET: process.env.NEXT_PUBLIC_S3_BUCKET,
    NEXT_PUBLIC_S3_REGION: process.env.NEXT_PUBLIC_S3_REGION,
    NEXT_PUBLIC_S3_PUBLIC: process.env.NEXT_PUBLIC_S3_PUBLIC,
    NEXT_PUBLIC_S3_SECRET: process.env.NEXT_PUBLIC_S3_SECRET,
    NEXT_PUBLIC_CLOUDFRONT_URL: process.env.NEXT_PUBLIC_CLOUDFRONT_URL,
  },
  emptyStringAsUndefined: true,
});
