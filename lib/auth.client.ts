import { createAuthClient } from "better-auth/react";
import {
  passkeyClient,
  adminClient,
  inferAdditionalFields,
  organizationClient,
  twoFactorClient,
  oneTapClient,
} from "better-auth/client/plugins";
import { toast } from "sonner";

import type { auth } from "./auth";
import { env } from "@/env/client";

const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_SITE_URL,
  plugins: [
    passkeyClient(),
    adminClient(),
    organizationClient(),
    twoFactorClient({ redirect: false, twoFactorPage: "/2fa" }),
    oneTapClient({ clientId: env.NEXT_PUBLIC_GOOGLE_CLIENT_ID }),
    inferAdditionalFields<typeof auth>(),
  ],
  fetchOptions: {
    onError: async (ctx) => {
      switch (ctx.response.status) {
        case 429:
          const retry = ctx.response.headers.get("X-Retry-After");

          toast.info(
            `Has excedido el límite de peticiones. Intenta nuevamente en ${retry} segundos.`,
          );
          break;

        case 500:
          toast.error("Ocurrió un error. Intenta nuevamente más tarde.");
          break;
      }
    },
  },
});

export const {
  sendVerificationEmail,
  verifyEmail,
  signIn,
  linkSocial,
  $Infer,
  forgetPassword,
  resetPassword,
  useSession,
  passkey,
  admin,
  useListPasskeys,
  signUp,
  signOut,
  twoFactor,
  oneTap,
  getSession,
} = authClient;

export type Session = typeof $Infer.Session;
export type Passkey = typeof $Infer.Passkey;
