import { createInsertSchema } from "drizzle-zod";
import type { TypeOf } from "zod";
import { any, coerce, number, object, string, enum as zodEnum } from "zod";

import { sale } from "@/db/schemas/sale";

export const createSaleSchema = createInsertSchema(sale, {
  buyerEmail: string().optional(),
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
    zodEnum(["CC", "CE", "NIT", "TI"], {
      message: "El tipo de documento no es válido",
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
  ownerId: () => string({ required_error: "El propietario es requerido" }),
  storeId: () => string({ required_error: "La tienda es requerida" }),
  total: () => coerce.number().positive(),
}).extend({
  products: any().optional(),
});

export const sendInvoiceSchema = createSaleSchema.pick({ buyerEmail: true });

export type SaleSchema = TypeOf<typeof createSaleSchema>;
export type SendInvoiceSchema = TypeOf<typeof sendInvoiceSchema>;
