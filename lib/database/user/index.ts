import { db } from "@/db/config";
import type { NewUser, User } from "@/db/schemas";
import { cache } from "@/lib/cache";

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
  const user = await db.query.user.findFirst({
    where: (t, { eq }) => eq(t.id, id),
  });

  return user;
};
