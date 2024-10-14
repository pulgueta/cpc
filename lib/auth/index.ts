import type { DefaultSession } from "next-auth";
import NextAuth from "next-auth";

import authConfig from "./auth.config";
import { env } from "@/env/server";
import { drizzleAdapter } from "./adapter";
import { getUserById, verifyEmail } from "../database/user";
import { getAccountByUserId } from "../database/account";
import type { User } from "@/db/schemas/user";

export type ExtendedUser = DefaultSession["user"] & {
  role: User["role"];
  emailVerified: Date;
  picture: string;
  accounts: [];
  isOAuth: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

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
    session: async ({ session, token }) => {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as User["role"];
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.isOAuth = token.isOAuth as boolean;
        session.user.image = token.image as string;
      }

      return session;
    },
    jwt: async ({ token }) => {
      if (!token.sub) return token;

      const user = await getUserById(token.sub);

      if (!user) return token;

      const account = await getAccountByUserId(user.id);

      token.isOAuth = !!account;
      token.name = user.name;
      token.email = user.email;
      token.id = user.id;
      token.role = user.role;

      return token;
    },
  },
  events: {
    linkAccount: async ({ user }) => {
      await verifyEmail(user.email as string);
    },
  },
  secret: env.AUTH_SECRET,
  experimental: {
    enableWebAuthn: true,
  },
});
