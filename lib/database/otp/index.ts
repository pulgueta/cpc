import { and, eq } from "drizzle-orm";

import type { NewOTPCode, NewUser } from "@/db/schemas";
import { otpCode } from "@/db/schemas/otp-code";
import { getUserByEmail } from "../user";
import { db } from "@/db/config";
import { hashValue, verifyValue } from "@/lib/crypto";

export const verifyUserCode = async (email: NewUser["email"], code: NewOTPCode["code"]) => {
  const user = await getUserByEmail(email);

  if (!user) {
    return;
  }

  const dbCode = await getCode(code, user);

  const isValidCode = await verifyValue(dbCode?.hashedCode as string, code);

  return !!dbCode && isValidCode;
};

export const deleteCode = async (email: NewUser["email"], code: NewOTPCode["code"]) => {
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

export const getCode = async (code: NewOTPCode["code"], user: NewUser) => {
  const hashedCode = await hashValue(code);

  const dbCode = await db.query.otpCode.findFirst({
    where: (t, { eq, and, lt }) =>
      and(
        eq(t.userId, user?.id as string),
        eq(t.code, code),
        eq(t.hashedCode, hashedCode),
        lt(t.expiresAt, new Date()),
      ),
  });

  return dbCode;
};
