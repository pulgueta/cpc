import { createInsertSchema } from "drizzle-zod";
import type { TypeOf } from "zod";
import { string } from "zod";

import { categories } from "@/db/schemas/category";

export const createCategorySchema = createInsertSchema(categories, {
  categoryName: string({
    required_error: "El nombre de la categoría no puede estar vacío",
    invalid_type_error: "El nombre de la categoría debe ser una cadena de texto válida",
  })
    .min(4, {
      message: "El nombre de la categoría debe tener al menos 4 caracteres",
    })
    .max(255, {
      message: "El nombre de la categoría debe tener como máximo 255 caracteres",
    }),
  categoryDescription: string({
    invalid_type_error: "La descripción de la categoría debe ser una cadena de texto válida",
  })
    .min(0, "La descripción de la categoría debe tener al menos 1 caracter")
    .max(500, "La descripción de la categoría debe tener como máximo 500 caracteres")
    .optional(),
  storeOwnerId: string({
    required_error: "El propietario de la tienda no puede estar vacío",
    invalid_type_error: "El propietario de la tienda debe ser una cadena de texto válida",
  })
    .min(4, {
      message: "El propietario de la tienda debe tener al menos 4 caracteres",
    })
    .max(255, {
      message: "El propietario de la tienda debe tener como máximo 255 caracteres",
    }),
});

export type CategorySchema = TypeOf<typeof createCategorySchema>;
