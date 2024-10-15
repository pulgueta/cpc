import { cache } from "react";

import { cookies } from "next/headers";

import { eq } from "drizzle-orm";
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";

import type { Session, User } from "@/db/schemas";
import { sessions, users } from "@/db/schemas";
import { db } from "@/db/config";

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);

  crypto.getRandomValues(bytes);

  const token = encodeBase32LowerCaseNoPadding(bytes);

  return token;
}

export const createSession = async (token: string, userId: string): Promise<Session> => {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  const sess: Session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  };

  const [session] = await db.insert(sessions).values(sess).returning();

  return session;
};

export const validateSessionToken = async (token: string): Promise<SessionValidationResult> => {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const result = await db
    .select({ user: users, session: sessions })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(eq(sessions.id, sessionId));

  if (result.length < 1) {
    return { session: null, user: null };
  }

  const { user, session } = result[0];

  if (Date.now() >= session.expiresAt.getTime()) {
    await db.delete(sessions).where(eq(sessions.id, session.id));

    return { session: null, user: null };
  }
  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);

    await db
      .update(sessions)
      .set({
        expiresAt: session.expiresAt,
      })
      .where(eq(sessions.id, session.id));
  }

  return { session, user };
};

export const invalidateSession = async (sessionId: string): Promise<void> => {
  await db.delete(sessions).where(eq(sessions.id, sessionId));
};

export const getCurrentSession = cache(async (): Promise<SessionValidationResult> => {
  const token = cookies().get("session")?.value ?? null;
  if (token === null) {
    return { session: null, user: null };
  }
  const result = await validateSessionToken(token);
  return result;
});

export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null };
