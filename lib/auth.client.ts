import { createAuthClient } from "better-auth/react";
import { passkeyClient, adminClient, inferAdditionalFields } from "better-auth/client/plugins";
import { toast } from "sonner";

import type { auth } from "./auth";

const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_SITE_URL,
  plugins: [passkeyClient(), adminClient(), inferAdditionalFields<typeof auth>()],
  fetchOptions: {
    onError: async (ctx) => {
      if (ctx.response.status === 429) {
        const retry = ctx.response.headers.get("X-Retry-After");

        toast.info(
          `Has excedido el límite de peticiones. Intenta nuevamente en ${retry} segundos.`,
        );
      }
    },
  },
});

export const {
  sendVerificationEmail,
  verifyEmail,
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
