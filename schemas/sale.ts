import { createInsertSchema } from "drizzle-zod";
import type { TypeOf } from "zod";
import { string } from "zod";

import { sales } from "@/db/schemas/sale";

export const createSaleSchema = createInsertSchema(sales, {
  buyerEmail: ({ buyerEmail }) =>
    buyerEmail
      .email({
        message: "Ingrese un correo electrónico válido",
      })
      .optional(),
  buyerName: () =>
    string({
      required_error: "El nombre es requerido",
    })
      .min(4, {
        message: "El nombre debe tener al menos 4 caracteres",
      })
      .max(255, {
        message: "El nombre debe tener como máximo 255 caracteres",
      }),
  buyerPhone: () =>
    string({
      required_error: "El teléfono es requerido",
    })
      .min(10, {
        message: "El teléfono debe tener al menos 10 dígitos",
      })
      .max(10, {
        message: "El teléfono debe tener como máximo 10 dígitos",
      }),
  documentType: () =>
    string({
      required_error: "El tipo de documento es requerido",
    }),
  document: () =>
    string({
      required_error: "El documento es requerido",
    })
      .min(5, {
        message: "El documento debe tener al menos 5 caracteres",
      })
      .max(32, {
        message: "El documento debe tener como máximo 32 caracteres",
      }),
});

export const sendInvoiceSchema = createSaleSchema.pick({ buyerEmail: true });

export type SaleSchema = TypeOf<typeof createSaleSchema>;
export type SendInvoiceSchema = TypeOf<typeof sendInvoiceSchema>;
