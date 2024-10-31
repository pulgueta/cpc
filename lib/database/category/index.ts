import { unstable_cache as cache } from "next/cache";

import type { Category, NewCategory } from "@/db/schemas/category";
import { categories } from "@/db/schemas/category";
import { db } from "@/db/config";

export const createCategory = async (data: NewCategory) => {
  const existingCategory = await getCategoryByName(data.categoryName);

  if (existingCategory) {
    return { error: "La categoría ya existe" };
  }

  const [category] = await db.insert(categories).values(data).returning();

  return {
    message: "Categoría creada exitosamente",
    category,
  };
};

export const getCategoryByName = async (categoryName: Category["categoryName"]) => {
  const category = await db.query.categories.findFirst({
    where: (t, { eq }) => eq(t.categoryName, categoryName),
  });

  return category;
};

export const getCategories = cache(
  async (storeOwnerId: Category["storeOwnerId"]) => {
    const categories = await db.query.categories.findMany({
      where: (t, { eq }) => eq(t.storeOwnerId, storeOwnerId),
    });

    return categories;
  },
  ["categories"],
  { revalidate: 3600, tags: ["categories"] },
);
