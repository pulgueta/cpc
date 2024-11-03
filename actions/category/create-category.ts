"use server";

import { revalidateTag } from "next/cache";

import { getCurrentSession } from "@/lib/auth/session";
import { createCategory, getCategoryByName } from "@/lib/database/category";
import { createCategorySchema } from "@/schemas/category";

export const createCategoryAction = async (_prev: unknown, e: FormData) => {
  const sessionData = await getCurrentSession();

  if (!sessionData?.session) {
    return { error: "No tienes permisos para realizar esta acción" };
  }

  const body = createCategorySchema.safeParse(Object.fromEntries(e.entries()));

  let errors: string[][] = [];

  if (!body.success) {
    errors = Object.entries(body.error?.flatten().fieldErrors!).map(([_key, value]) => value);
  }

  if (!body.success) {
    return { error: errors };
  }

  const categoryData = body.data;

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
    category: category.category,
  };
};
