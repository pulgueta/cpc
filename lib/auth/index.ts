import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import authConfig from "./auth.config";
import { db } from "@/db/config";

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
  unstable_update: update,
} = NextAuth({
  ...authConfig,
  adapter: DrizzleAdapter(db),
  useSecureCookies: process.env.NODE_ENV === "production",
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
});
