"use server";

import { revalidateTag } from "next/cache";

import { getCategoryByName, updateCategory } from "@/lib/database/category";
import { updateCategorySchema } from "@/schemas/category";
import { handleAction } from "../handle-action";

export const updateCategoryAction = async (_prev: unknown, e: FormData) => {
  const categoryData = await handleAction(updateCategorySchema, e);

  if ("error" in categoryData) {
    return { error: categoryData.error };
  }

  const existingCategory = await getCategoryByName(categoryData.categoryName);

  if (
    categoryData.categoryName === existingCategory?.categoryName &&
    categoryData.categoryDescription === existingCategory?.categoryDescription
  ) {
    return {
      error: "Debes realizar cambios en la categoría para poder actualizarla",
    };
  }

  const category = await updateCategory({
    categoryName: categoryData.categoryName,
    categoryDescription: categoryData.categoryDescription,
    id: categoryData.id,
  });

  if (!category) {
    return {
      error: "Ocurrió un error inesperado, intenta nuevamente más tarde",
    };
  }

  revalidateTag("categories");

  return {
    message: category.message,
  };
};
