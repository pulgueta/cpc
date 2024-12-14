import {
  adminClient,
  inferAdditionalFields,
  oneTapClient,
  organizationClient,
  passkeyClient,
  twoFactorClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { toast } from "sonner";

import { env } from "@/env/client";
import type { auth } from "./auth";

const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_SITE_URL,
  plugins: [
    passkeyClient(),
    adminClient(),
    organizationClient(),
    twoFactorClient(),
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
  linkSocial,
  $Infer,
  useSession,
  twoFactor,
  passkey,
  signIn,
  admin,
  useListPasskeys,
  oneTap,
  getSession,
  useListOrganizations,
} = authClient;

export type Session = typeof $Infer.Session;
export type Passkey = typeof $Infer.Passkey;
export type Organization = typeof $Infer.Organization;
