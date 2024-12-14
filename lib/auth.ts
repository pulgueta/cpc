import type { RateLimit } from "better-auth";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { admin, oAuthProxy, oneTap, organization, passkey, twoFactor } from "better-auth/plugins";

import { db } from "@/db/config";
import * as schema from "@/db/schemas";
import { env as client } from "@/env/client";
import { env, env as server } from "@/env/server";
import { cache } from "./cache";
import { hashValue, verifyValue } from "./crypto";
import { sendOtpEmail, sendPasswordResetEmail, sendWelcomeEmail } from "./email";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.user,
      session: schema.session,
      passkey: schema.passkey,
      account: schema.account,
      verification: schema.verification,
      organization: schema.organization,
      member: schema.member,
      twoFactor: schema.twoFactor,
    },
  }),
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
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
      hash: hashValue,
      verify: async ({ hash, password }) => verifyValue(hash, password),
    },
    resetPasswordTokenExpiresIn: 3600 * 2,
    sendResetPassword: async ({ user, url }) => {
      await sendPasswordResetEmail(user, url);
    },
    requireEmailVerification: true,
  },
  user: {
    additionalFields: {
      plan: {
        type: "string",
        required: false,
        input: false,
        defaultValue: "free",
      },
      document: {
        type: "string",
        required: false,
        input: true,
        unique: true,
      },
      documentType: {
        type: "string",
        required: false,
        input: true,
        fieldName: "document_type",
      },
      phone: {
        type: "string",
        required: false,
        input: true,
        defaultValue: "",
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
  },
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,
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
      clientId: client.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: server.GOOGLE_CLIENT_SECRET,
      enabled: true,
      redirectURI: `${server.BETTER_AUTH_URL}/api/auth/google/callback`,
    },
  },
  plugins: [
    passkey(),
    admin(),
    organization(),
    oAuthProxy(),
    oneTap(),
    twoFactor({
      issuer: "Centro Popular Comercial",
      otpOptions: {
        sendOTP: async ({ user, otp }) => {
          await sendOtpEmail({ email: user.email, name: user.name }, otp);
        },
      },
    }),
    nextCookies(),
  ],
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "email-password"],
    },
  },
  advanced: {
    useSecureCookies: process.env.NODE_ENV === "production",
  },
  trustedOrigins: [server.BETTER_AUTH_URL],
});

export type Session = typeof auth.$Infer.Session;
