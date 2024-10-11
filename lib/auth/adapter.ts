import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { and, eq } from "drizzle-orm";
import type {
  Adapter,
  AdapterAccount,
  AdapterAuthenticator,
} from "next-auth/adapters";

import { db } from "@/db/config";
import {
  accounts,
  sessions,
  users,
  verificationTokens,
  authenticators,
} from "@/db/schemas";

export const drizzleAdapter = {
  ...DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
    authenticatorsTable: authenticators,
  }),
  getAccount: async (providerAccountId, provider) => {
    const [account] = await db
      .select()
      .from(accounts)
      .where(
        and(
          eq(accounts.provider, provider),
          eq(accounts.providerAccountId, providerAccountId),
        ),
      );
    return (account as AdapterAccount) ?? null;
  },
  createAuthenticator: async (data) => {
    const id = crypto.randomUUID();
    await db.insert(authenticators).values({
      id,
      ...data,
    });
    const [authenticator] = await db
      .select()
      .from(authenticators)
      .where(eq(authenticators.id, id));
    const { transports, id: _, ...rest } = authenticator;
    return { ...rest, transports: transports ?? undefined };
  },
  getAuthenticator: async (credentialId) => {
    const [authenticator] = await db
      .select()
      .from(authenticators)
      .where(eq(authenticators.credentialID, credentialId));
    return (authenticator as AdapterAuthenticator) ?? null;
  },
  listAuthenticatorsByUserId: async (userId) => {
    const auths = await db
      .select()
      .from(authenticators)
      .where(eq(authenticators.userId, userId));
    return auths.map((a) => ({
      ...a,
      transports: a.transports ?? undefined,
    }));
  },
  updateAuthenticatorCounter: async (credentialId, counter) => {
    await db
      .update(authenticators)
      .set({ counter })
      .where(eq(authenticators.credentialID, credentialId));
    const [authenticator] = await db
      .select()
      .from(authenticators)
      .where(eq(authenticators.credentialID, credentialId));
    return (authenticator as AdapterAuthenticator) ?? null;
  },
} satisfies Adapter;
