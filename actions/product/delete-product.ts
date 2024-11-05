"use server";

import { revalidateTag } from "next/cache";

import { deleteProduct, getProductById } from "@/lib/database/product";
import { handleAction } from "../handle-action";
import { deleteProductSchema } from "@/schemas/product";

export const deleteProductAction = async (_prev: unknown, e: FormData) => {
  const product = await handleAction(deleteProductSchema, e);

  if ("error" in product) {
    return { error: product.error };
  }

  const existingProduct = await getProductById(product.id ?? "");

  if (!existingProduct) {
    return {
      error: "La categoría no existe",
    };
  }

  const deletedProduct = await deleteProduct(existingProduct.id);

  revalidateTag("categories");

  return {
    message: deletedProduct.message,
  };
};
