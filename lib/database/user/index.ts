import { db } from "@/db/config";
import type { NewUser } from "@/db/schemas";
import { users } from "@/db/schemas";
import { hashValue } from "@/lib/crypto";

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

export const getUserByEmail = async (email: NewUser["email"]) => {
  const user = await db.query.users.findFirst({
    where: (t, { eq }) => eq(t.email, email),
  });

  return user;
};
