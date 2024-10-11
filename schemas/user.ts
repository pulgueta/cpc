import type { TypeOf } from "zod";
import { string } from "zod";
import { createInsertSchema } from "drizzle-zod";

import { users } from "@/db/schemas";
import { CREATE_USER } from "@/constants";

export const registerSchema = createInsertSchema(users, {
  name: () =>
    string({
      invalid_type_error: CREATE_USER.name.invalid_type_error,
      required_error: CREATE_USER.name.required_error,
    })
      .min(CREATE_USER.name.minLength.value, {
        message: CREATE_USER.name.minLength.message,
      })
      .max(CREATE_USER.name.maxLength.value, {
        message: CREATE_USER.name.maxLength.message,
      }),
  email: () =>
    string({
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
  password: () =>
    string({
      invalid_type_error: CREATE_USER.password.invalid_type_error,
      required_error: CREATE_USER.password.required_error,
    })
      .min(CREATE_USER.password.minLength.value, {
        message: CREATE_USER.password.minLength.message,
      })
      .max(CREATE_USER.password.maxLength.value, {
        message: CREATE_USER.password.maxLength.message,
      }),
});

export const loginSchema = registerSchema.pick({
  email: true,
  password: true,
});

export const forgotPasswordSchema = registerSchema.pick({
  email: true,
});

export const resetPasswordSchema = registerSchema.pick({
  password: true,
});

export type RegisterSchema = TypeOf<typeof registerSchema>;
export type LoginSchema = TypeOf<typeof loginSchema>;
export type ForgotPasswordSchema = TypeOf<typeof forgotPasswordSchema>;
export type ResetPasswordSchema = TypeOf<typeof resetPasswordSchema>;
