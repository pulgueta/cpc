"use server";

import { revalidateTag } from "next/cache";

import { getCurrentSession } from "@/lib/auth/session";
import { getCategoryByName, updateCategory } from "@/lib/database/category";
import { updateCategorySchema } from "@/schemas/category";

export const updateCategoryAction = async (_prev: unknown, e: FormData) => {
  const sessionData = await getCurrentSession();

  if (!sessionData?.session) {
    return { error: "No tienes permisos para realizar esta acción" };
  }

  const body = updateCategorySchema.safeParse(Object.fromEntries(e.entries()));

  let errors: string[][] = [];

  if (!body.success) {
    errors = Object.entries(body.error?.flatten().fieldErrors!).map(([_key, value]) => value);
  }

  if (!body.success) {
    return { error: errors };
  }

  const categoryData = body.data;

  const existingCategory = await getCategoryByName(categoryData.categoryName);

  if (
    categoryData.categoryName === existingCategory?.categoryName ||
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
    category: category.category,
  };
};
