import NextAuth from "next-auth";

import authConfig from "./auth.config";
import { db } from "@/db/config";
import { env } from "@/env/server";
import { drizzleAdapter } from "./adapter";

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
  unstable_update: update,
} = NextAuth({
  ...authConfig,
  adapter: drizzleAdapter,
  useSecureCookies: process.env.NODE_ENV === "production",
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  callbacks: {
    session: async ({ session, user }) => {
      session.user.id = user.id;

      return session;
    },
  },
  secret: env.AUTH_SECRET,
  experimental: {
    enableWebAuthn: true,
  },
});
