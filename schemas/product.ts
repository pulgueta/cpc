import { createInsertSchema } from "drizzle-zod";
import type { TypeOf } from "zod";
import { coerce, string } from "zod";

import { products } from "@/db/schemas/product";

export const createProductSchema = createInsertSchema(products, {
  productName: string({
    required_error: "El nombre del producto no puede estar vacío",
    invalid_type_error: "El nombre del producto debe ser una cadena de texto válida",
  })
    .min(4, {
      message: "El nombre del producto debe tener al menos 4 caracteres",
    })
    .max(255, {
      message: "El nombre del producto debe tener como máximo 255 caracteres",
    }),
  productDescription: string({
    invalid_type_error: "La descripción del producto debe ser una cadena de texto válida",
  }).optional(),
  productPrice: coerce
    .number({
      required_error: "El precio del producto no puede estar vacío",
      invalid_type_error: "El precio del producto debe ser un número",
    })
    .int({
      message: "El precio del producto debe ser un número entero",
    })
    .positive({
      message: "El precio del producto debe ser un número positivo",
    })
    .gte(1000, {
      message: "El precio del producto debe ser mayor o igual a $1.000 pesos",
    })
    .lte(30000000, {
      message: "El precio del producto debe ser menor o igual a $30'000.000 pesos",
    }),
  productImageUrl: string({
    required_error: "La imagen del producto no puede estar vacía",
    invalid_type_error: "La imagen del producto debe ser una cadena de texto válida",
  })
    .url({
      message: "La imagen del producto debe ser una URL válida",
    })
    .min(10, {
      message: "La imagen del producto debe tener al menos 10 caracteres",
    })
    .startsWith("https://", {
      message: "La imagen del producto debe tener una URL segura (HTTPS)",
    }),
  productImageCdnUrl: string({
    required_error: "La imagen del producto no puede estar vacía",
    invalid_type_error: "La imagen del producto debe ser una cadena de texto válida",
  })
    .url({
      message: "La imagen del producto debe ser una URL válida",
    })
    .min(10, {
      message: "La imagen del producto debe tener al menos 10 caracteres",
    })
    .startsWith("https://", {
      message: "La imagen del producto debe tener una URL segura (HTTPS)",
    }),
  stock: coerce
    .number({
      required_error: "La cantidad de stock no puede estar vacía",
      invalid_type_error: "La cantidad de stock debe ser un número",
    })
    .int({
      message: "La cantidad de stock debe ser un número entero",
    })
    .min(1, {
      message: "La cantidad de stock debe ser mayor a 0",
    }),
  productCategory: string({
    required_error: "La categoría del producto no puede estar vacía",
    invalid_type_error: "La categoría del producto debe ser una cadena de texto válida",
  }),
});

export const updateProductSchema = createProductSchema;
export const deleteProductSchema = createProductSchema.pick({
  id: true,
});

export type ProductSchema = TypeOf<typeof createProductSchema>;
export type UpdateProductSchema = TypeOf<typeof updateProductSchema>;
