import { headers } from "next/headers";

import { db } from "@/db/config";
import type { NewUser, User } from "@/db/schemas";
import { auth } from "@/lib/auth";
import { cache } from "@/lib/cache";
import { getCurrentSession } from "@/lib/auth/session";

export const getUserByEmail = async (email: NewUser["email"], getCached: boolean = false) => {
  const cached = await cache.get<User>(email);

  if (cached && getCached) {
    return cached;
  }

  const user = await db.query.user.findFirst({
    where: (t, { eq }) => eq(t.email, email),
  });

  if (user) {
    await cache.set<User>(email, user);
  }

  return user;
};

export const getUserById = async (id: User["id"]) => {
  const cached = await cache.get<User>(id);

  if (cached) {
    return cached;
  }

  const user = await db.query.user.findFirst({
    where: (t, { eq }) => eq(t.id, id),
  });

  return user;
};

export const generateQrCode = async (pwd: string) => {
  const verification = await auth.api.enableTwoFactor({
    headers: await headers(),
    body: {
      password: pwd,
    },
  });

  return {
    message: "Código QR generado",
    verification,
  };
};

export const isUserSignedWithSocial = async () => {
  const sessionUser = await getCurrentSession();

  const user = await db.query.account.findFirst({
    where: (t, { eq }) => eq(t.id, sessionUser?.user.id ?? ""),
  });

  return user?.providerId !== "credential";
};
