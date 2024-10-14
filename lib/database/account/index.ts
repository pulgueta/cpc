import { db } from "@/db/config";
import type { User } from "@/db/schemas/user";
import { accounts } from "@/db/schemas/account";

export const getAccountByGoogleId = async (googleId: User["googleId"]) => {
  const user = await db.query.users.findFirst({
    where: (t, { eq }) => eq(t.googleId, googleId as string),
  });

  return user;
};

export const createAccountViaGoogle = async (userId: User["id"], googleId: string) => {
  const [acc] = await db
    .insert(accounts)
    .values({
      googleId,
      userId,
    })
    .returning();

  return acc;
};
