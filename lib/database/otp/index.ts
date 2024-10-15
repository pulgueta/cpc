import { and, eq } from "drizzle-orm";

import type { NewOTPCode, User } from "@/db/schemas";
import { otpCode } from "@/db/schemas/otp-code";
import { getUserByEmail } from "../user";
import { db } from "@/db/config";

export const verifyUserCode = async (email: User["email"], code: NewOTPCode["code"]) => {
  const user = await getUserByEmail(email);

  if (!user) {
    return;
  }

  const dbCode = await getCode(code, user);

  return !!dbCode;
};

export const deleteCode = async (email: User["email"], code: NewOTPCode["code"]) => {
  const user = await getUserByEmail(email);

  if (!user) {
    return;
  }

  const dbCode = await getCode(code, user);

  if (dbCode) {
    await db
      .delete(otpCode)
      .where(and(eq(otpCode.userId, user?.id as string), eq(otpCode.code, code)));
  }
};

export const getCode = async (code: NewOTPCode["code"], user: User) => {
  const dbCode = await db.query.otpCode.findFirst({
    where: (t, { eq, and, lt }) =>
      and(eq(t.userId, user.id), eq(t.code, code), lt(t.expiresAt, new Date())),
  });

  return dbCode;
};
