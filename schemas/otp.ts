import type { TypeOf } from "zod";
import { object, string } from "zod";

export const twoFactorSchema = object({
  code: string({ required_error: "El código es requerido" })
    .min(6, {
      message: "El código debe tener al menos 6 caracteres",
    })
    .max(6, {
      message: "El código debe tener como máximo 6 caracteres",
    }),
});

export const twoFactorDisableSchema = object({
  password: string({ required_error: "La contraseña es requerida" })
    .min(4, {
      message: "La contraseña debe tener al menos 4 caracteres",
    })
    .max(32, {
      message: "La contraseña debe tener como máximo 32 caracteres",
    }),
});

export type TwoFactor = TypeOf<typeof twoFactorSchema>;
export type TwoFactorDisable = TypeOf<typeof twoFactorDisableSchema>;
