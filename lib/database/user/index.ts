import { eq } from "drizzle-orm";

import { db } from "@/db/config";
import type { NewUser, User } from "@/db/schemas";
import { users } from "@/db/schemas";
import { hashValue } from "@/lib/crypto";
import { cache } from "@/lib/cache";

export const createUser = async (values: NewUser) => {
  const existingUser = await getUserByEmail(values.email);

  if (existingUser) {
    return null;
  }

  const encryptedPassword = await hashValue(values.password);

  const [user] = await db
    .insert(users)
    .values({
      ...values,
      password: encryptedPassword,
    })
    .returning({
      id: users.id,
      email: users.email,
      name: users.name,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    });

  return user;
};

export const getUserByEmail = async (
  email: NewUser["email"],
  getCached: boolean = false
) => {
  const cached = await cache.get<User>(email);

  if (cached && getCached) {
    return cached;
  }

  const user = await db.query.users.findFirst({
    where: (t, { eq }) => eq(t.email, email),
  });

  if (user) {
    await cache.set<User>(email, user);
  }

  return user;
};

export const verifyEmail = async (email: NewUser["email"]) => {
  const user = await getUserByEmail(email);

  const [verifiedUser] = await db
    .update(users)
    .set({
      emailVerified: new Date(),
    })
    .where(eq(users.email, user?.email as string))
    .returning({
      id: users.id,
      email: users.email,
      name: users.name,
      emailVerified: users.emailVerified,
    });

  return verifiedUser;
};

export const getUserById = async (id: User["id"]) => {
  const user = await db.query.users.findFirst({
    where: (t, { eq }) => eq(t.id, id),
  });

  return user;
};

export const isEmailVerified = async (email: NewUser["email"]) => {
  const user = await getUserByEmail(email);

  return user?.emailVerified !== null;
};
