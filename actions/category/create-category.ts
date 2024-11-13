"use server";

import { revalidateTag } from "next/cache";

import { getCurrentSession } from "@/lib/auth/session";
import { createCategory, getCategoryByName } from "@/lib/database/category";
import { createCategorySchema } from "@/schemas/category";
import { handleAction } from "../handle-action";

export const createCategoryAction = async (_prev: unknown, e: FormData) => {
  const sessionData = await getCurrentSession();

  if (!sessionData) {
    return { error: "No hay una sesión activa" };
  }

  const categoryData = await handleAction(createCategorySchema, e);

  if ("error" in categoryData) {
    return { error: categoryData.error };
  }

  const existingCategory = await getCategoryByName(categoryData.categoryName);

  if (existingCategory?.categoryName.toLowerCase() === categoryData.categoryName.toLowerCase()) {
    return { error: "La categoría ya existe" };
  }

  const category = await createCategory({
    categoryName: categoryData.categoryName,
    categoryDescription: categoryData.categoryDescription,
    storeOwnerId: sessionData.user.id,
  });

  if (category.error) {
    return { error: category.error };
  }

  revalidateTag("categories");

  return {
    message: category.message,
  };
};
