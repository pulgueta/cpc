import { generateTOTP } from "@oslojs/otp";

import { otpCode } from "@/db/schemas/otp-code";
import { db } from "@/db/config";
import type { NewUser } from "@/db/schemas";
import { env } from "@/env/server";

export const generateOTPCode = async (userId: NewUser["id"]) => {
  const code = generateTOTP(new Uint8Array(env.ARGON2_SECRET.length), 30, 6);

  await db
    .insert(otpCode)
    .values({
      code,
      userId,
    })
    .returning({
      code: otpCode.code,
    });

  return code;
};
