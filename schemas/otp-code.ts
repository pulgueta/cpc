import { createInsertSchema } from "drizzle-zod";

import type { TypeOf } from "zod";
import { string } from "zod";

import { otpCode } from "@/db/schemas/otp-code";
import { CREATE_USER, OTP_CODE } from "@/constants";

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
}).extend({
  email: string({
    invalid_type_error: CREATE_USER.email.invalid_type_error,
    required_error: CREATE_USER.email.required_error,
  })
    .min(CREATE_USER.email.minLength.value, {
      message: CREATE_USER.email.minLength.message,
    })
    .max(CREATE_USER.email.maxLength.value, {
      message: CREATE_USER.email.maxLength.message,
    })
    .email(CREATE_USER.email.email),
});

export type OTPCodeSchema = TypeOf<typeof otpCodeSchema>;
