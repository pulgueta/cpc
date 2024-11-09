import { betterAuth, RateLimit } from "better-auth";
import { passkey, admin, organization, oAuthProxy } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { hashValue, verifyValue } from "./crypto";
import { db } from "@/db/config";
import * as schema from "@/db/schemas";
import { cache } from "./cache";
import { sendPasswordResetEmail, sendWelcomeEmail } from "./email";
import { env } from "@/env/server";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.user,
      session: schema.session,
      passkey: schema.passkey,
      account: schema.account,
      verification: schema.verification,
    },
  }),
  emailVerification: {
    sendVerificationEmail: async (user, url) => {
      await sendWelcomeEmail(user, url);
    },
    sendOnSignUp: true,
  },
  emailAndPassword: {
    enabled: true,
    maxPasswordLength: 100,
    minPasswordLength: 4,
    autoSignIn: true,
    password: {
      hash: async (a) => await hashValue(a),
      verify: async (a, b) => await verifyValue(a, b),
    },
    resetPasswordTokenExpiresIn: 3600 * 2,
    sendResetPassword: async (user, url) => {
      await sendPasswordResetEmail(user, url);
    },
    requireEmailVerification: true,
  },
  user: {
    additionalFields: {
      plan: {
        type: "string",
        required: false,
        defaultValue: "free",
      },
      password: {
        type: "string",
        required: true,
        defaultValue: "",
        input: true,
        hashValue: true,
        fieldName: "password",
      },
      role: {
        type: "string",
        required: true,
        defaultValue: "user",
        input: false,
      },
      document: {
        type: "string",
        required: false,
        input: true,
        defaultValue: null,
        unique: true,
      },
      phone: {
        type: "string",
        required: false,
        input: true,
        defaultValue: null,
        unique: true,
      },
    },
    changeEmail: {
      enabled: false,
    },
  },
  session: {
    storeSessionInDatabase: true,
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  baseURL: process.env.BETTER_AUTH_URL ?? "",
  secret: process.env.BETTER_AUTH_SECRET ?? "",
  rateLimit: {
    enabled: true,
    window: 30,
    max: 5,
    storage: "secondary-storage",
    customStorage: {
      get: async (k) => (await cache.get(k)) as RateLimit | undefined,
      set: async (k, v) => {
        await cache.set(k, v);
      },
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      enabled: true,
      redirectURL: `${env.BETTER_AUTH_URL}/api/auth/google/callback`,
    },
  },
  plugins: [passkey(), admin(), organization(), oAuthProxy()],
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "email-password"],
    },
  },
  advanced: {
    useSecureCookies: process.env.NODE_ENV === "production",
  },
  trustedOrigins: [env.BETTER_AUTH_URL],
});

export type Session = typeof auth.$Infer.Session;
