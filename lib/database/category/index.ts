import { unstable_cache as cache } from "next/cache";

import { eq } from "drizzle-orm";

import type { Category, NewCategory } from "@/db/schemas/category";
import { categories } from "@/db/schemas/category";
import { db } from "@/db/config";

export const createCategory = async (data: NewCategory) => {
  const existingCategory = await getCategoryByName(data.categoryName);

  if (existingCategory) {
    return { error: "La categoría ya existe" };
  }

  const [category] = await db.insert(categories).values(data).onConflictDoNothing().returning();

  return {
    message: "Categoría creada exitosamente",
    category,
  };
};

export const updateCategory = async (
  data: Pick<NewCategory, "categoryDescription" | "categoryName" | "id">,
) => {
  const [category] = await db
    .update(categories)
    .set(data)
    .where(eq(categories.id, data.id ?? ""))
    .returning();

  return {
    message: "Categoría actualizada exitosamente",
    category,
  };
};

export const getCategoryByName = cache(
  async (categoryName: Category["categoryName"]) => {
    const category = await db.query.categories.findFirst({
      where: (t, { eq }) => eq(t.categoryName, categoryName),
    });

    return category;
  },
  ["categories"],
  { revalidate: 3600, tags: ["categories"] },
);

export const getCategories = cache(
  async (storeOwnerId: Category["storeOwnerId"]) => {
    const categories = await db.query.categories.findMany({
      where: (t, { eq }) => eq(t.storeOwnerId, storeOwnerId),
      orderBy: (t, { asc }) => [asc(t.createdAt)],
    });

    return categories;
  },
  ["categories"],
  { revalidate: 3600, tags: ["categories"] },
);
