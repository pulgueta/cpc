"use server";

import { revalidateTag } from "next/cache";

import { deleteCategory, getCategoryById } from "@/lib/database/category";
import { deleteCategorySchema } from "@/schemas/category";
import { handleAction } from "../handle-action";

export const deleteCategoryAction = async (_prev: unknown, e: FormData) => {
  const category = await handleAction(deleteCategorySchema, e);

  if ("error" in category) {
    return { error: category.error };
  }

  const existingCategory = await getCategoryById(category.id ?? "");

  if (!existingCategory) {
    return {
      error: "La categoría no existe",
    };
  }

  const deletedCategory = await deleteCategory(existingCategory.id);

  revalidateTag("categories");

  return {
    message: deletedCategory.message,
  };
};
