import { createAuthClient } from "better-auth/react";
import {
  passkeyClient,
  adminClient,
  inferAdditionalFields,
} from "better-auth/client/plugins";
import { toast } from "sonner";

import { env } from "@/env/client";
import type { auth } from "./auth";

const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_SITE_URL,
  plugins: [
    passkeyClient(),
    adminClient(),
    inferAdditionalFields<typeof auth>(),
  ],
  fetchOptions: {
    onError: async (ctx) => {
      const { response } = ctx;

      if (response.status === 429) {
        const retry = response.headers.get("X-Retry-After");

        toast.info(
          `Has excedido el límite de peticiones. Intenta nuevamente en ${retry} segundos.`
        );
      }
    },
  },
});

export const {
  sendVerificationEmail,
  verifyEmail,
  user,
  signIn,
  $Infer,
  forgetPassword,
  resetPassword,
  useSession,
  passkey,
  admin,
  useListPasskeys,
  signUp,
  signOut,
  session,
} = authClient;

export type Session = typeof $Infer.Session;
export type Passkey = typeof $Infer.Passkey;
