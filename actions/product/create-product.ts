"use server";

import { revalidateTag } from "next/cache";

import { createProductSchema } from "@/schemas/product";
import { handleAction } from "../handle-action";
import { createProduct } from "@/lib/database/product";
import { uploadProductImage } from "@/lib/cloudlfare/r2";

export const createProductAction = async (_prev: unknown, e: FormData) => {
  const product = await handleAction(createProductSchema, e);

  if ("error" in product) {
    return { error: product.error, defaultValues: product.defaultValues };
  }

  const image = e.get("productImageUrl") as File;

  const uploaded = await uploadProductImage(image, product.storeOwnerId);

  const savedProduct = await createProduct({
    ...product,
    productImageUrl: uploaded ?? "",
  });

  if (!savedProduct) {
    return {
      error: "No se pudo crear el producto",
    };
  }

  revalidateTag("products");

  return {
    message: `${savedProduct.productName} creado con éxito`,
  };
};
