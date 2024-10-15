import { createInsertSchema } from "drizzle-zod";

import type { TypeOf } from "zod";
import { string } from "zod";

import { otpCode } from "@/db/schemas/otp-code";
import { OTP_CODE } from "@/constants";

export const otpCodeSchema = createInsertSchema(otpCode, {
  code: () =>
    string({
      invalid_type_error: OTP_CODE.invalid_type_error,
      required_error: OTP_CODE.required_error,
    })
      .min(OTP_CODE.minLength.value, {
        message: OTP_CODE.minLength.message,
      })
      .max(OTP_CODE.maxLength.value, {
        message: OTP_CODE.maxLength.message,
      }),
});

export type OTPCodeSchema = TypeOf<typeof otpCodeSchema>;
