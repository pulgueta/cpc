import type { TypeOf } from "zod";
import { boolean, enum as zodEnum, string, number, coerce } from "zod";
import { createInsertSchema } from "drizzle-zod";

import { user } from "@/db/schemas";
import { CREATE_USER } from "@/constants";

export const registerSchema = createInsertSchema(user, {
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
  role: (s) => s.role.optional(),
});

export const loginSchema = registerSchema
  .pick({
    email: true,
    password: true,
  })
  .extend({
    remember: boolean().optional().default(false),
  });

export const forgotPasswordSchema = registerSchema.pick({
  email: true,
});

export const resetPasswordSchema = registerSchema.pick({
  password: true,
});

export const generate2FAQr = registerSchema.pick({
  password: true,
});

export const converToSellerSchema = registerSchema
  .pick({
    email: true,
  })
  .extend({
    storeName: string({
      required_error: "El nombre de la tienda es requerido",
      invalid_type_error: "El nombre de la tienda debe ser texto válido",
    })
      .min(6, {
        message: "El nombre de la tienda debe tener al menos 6 caracteres",
      })
      .max(255, {
        message: "El nombre de la tienda debe tener máximo 255 caracteres",
      }),
    logo: string()
      .url({
        message: "La URL de la imagen no es válida",
      })
      .startsWith("https://", {
        message: "La URL de la imagen debe ser HTTPS",
      })
      .optional(),
    mainContactPhone: string({
      required_error: "El teléfono de contacto es requerido",
      invalid_type_error: "El teléfono de contacto debe ser texto válido",
    })
      .min(10, {
        message: "El teléfono de contacto debe tener al menos 10 caracteres",
      })
      .max(10, {
        message: "El teléfono de contacto debe tener máximo 10 caracteres",
      })
      .regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/), {
        message: "El teléfono de contacto no es válido",
      }),
    documentType: zodEnum(["CC", "CE", "NIT", "TI"], {
      message: "El tipo de documento no es válido",
    }),
    document: string({
      required_error: "El documento de identidad es requerido",
      invalid_type_error: "El documento de identidad debe ser texto válido",
    })
      .min(6, {
        message: "El documento de identidad debe tener al menos 6 caracteres",
      })
      .max(16, {
        message: "El documento de identidad debe tener máximo 16 caracteres",
      }),
    salesGoal: coerce
      .number({
        required_error: "La meta de ventas es requerida",
        invalid_type_error: "La meta de ventas debe ser un número",
      })
      .positive({
        message: "La meta de ventas no puede ser negativa",
      })
      .min(100000, {
        message: "La meta de ventas debe ser mayor a $100.000",
      })
      .max(Number.MAX_SAFE_INTEGER, {
        message: "Valor máximo excedido",
      }),
    ownerId: string(),
  });

export type RegisterSchema = TypeOf<typeof registerSchema>;
export type LoginSchema = TypeOf<typeof loginSchema>;
export type ForgotPasswordSchema = TypeOf<typeof forgotPasswordSchema>;
export type ResetPasswordSchema = TypeOf<typeof resetPasswordSchema>;
export type Generate2FAQrSchema = TypeOf<typeof generate2FAQr>;
export type ConvertToSellerSchema = TypeOf<typeof converToSellerSchema>;
