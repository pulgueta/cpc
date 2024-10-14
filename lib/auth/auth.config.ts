import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Passkey from "next-auth/providers/passkey";

export default {
  providers: [Google({ allowDangerousEmailAccountLinking: true }), Credentials, Passkey],
} satisfies NextAuthConfig;
