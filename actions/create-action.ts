"use server";

import { revalidateTag } from "next/cache";

import { getCurrentSession } from "@/lib/auth/session";
import { createCategory } from "@/lib/database/category";
import { createCategorySchema } from "@/schemas/category";

export const createCategoryAction = async (_prev: unknown, e: FormData) => {
  const sessionData = await getCurrentSession();

  if (!sessionData?.session) {
    return { error: "No tienes permisos para realizar esta acción" };
  }

  const body = createCategorySchema.safeParse(Object.fromEntries(e.entries()));

  const errors = Object.entries(body.error?.flatten().fieldErrors!).map(([_key, value]) => value);

  if (!body.success) {
    return { error: errors };
  }

  const categoryData = body.data;

  console.log(categoryData);

  const existingCategory = await createCategory({
    ...categoryData,
    storeOwnerId: sessionData.user.id,
  });

  if (existingCategory.error) {
    return { error: existingCategory.error };
  }

  revalidateTag("categories");

  return {
    message: existingCategory.message,
    category: existingCategory.category,
  };
};
