import { unstable_cache as cache } from "next/cache";

import { eq } from "drizzle-orm";

import type { NewProduct, Product } from "@/db/schemas/product";
import { products } from "@/db/schemas/product";
import { db } from "@/db/config";
import { base64Img } from "@/lib/base64-image";

export const createProduct = async (data: NewProduct) => {
  const [product] = await db.insert(products).values(data).returning();

  return product;
};

export const getProductByName = cache(
  async (productName: Product["productName"]) => {
    const product = await db.query.products.findFirst({
      where: (t, { eq }) => eq(t.productName, productName),
    });

    return product;
  },
  ["products"],
  { revalidate: 3600, tags: ["products"] },
);

export const getProductById = cache(
  async (productId: Product["id"]) => {
    const product = await db.query.products.findFirst({
      where: (t, { eq }) => eq(t.id, productId),
    });

    return product;
  },
  ["products"],
  { revalidate: 3600, tags: ["products"] },
);

export const getProductByCategory = cache(
  async (productCategory: Product["productCategory"]) => {
    const product = await db.query.products.findFirst({
      where: (t, { eq }) => eq(t.productCategory, productCategory),
    });

    return product;
  },
  ["products"],
  { revalidate: 3600, tags: ["products"] },
);

export const getProducts = cache(
  async (storeOwnerId: Product["storeOwnerId"], page: number = 1, pageSize: number = 15) => {
    const products = await db.query.products.findMany({
      where: (t, { eq }) => eq(t.storeOwnerId, storeOwnerId),
      with: {
        category: true,
      },
      limit: pageSize,
      offset: (page - 1) * pageSize,
      orderBy: (t, { asc }) => [asc(t.createdAt)],
    });

    const productsWithBlur = await Promise.all(
      products.map(async (product) => ({
        ...product,
        blurDataUrl: await base64Img(product.productImageUrl),
      })),
    );

    return productsWithBlur;
  },
  ["products"],
  { revalidate: 3600, tags: ["products"] },
);

export const deleteProduct = async (productId: Product["id"]) => {
  const product = await db.delete(products).where(eq(products.id, productId)).returning();

  return {
    message: "Producto eliminado exitosamente",
    product,
  };
};

export const updateProduct = async (productId: Product["id"], data: NewProduct) => {
  const [product] = await db
    .update(products)
    .set(data)
    .where(eq(products.id, productId))
    .returning();

  return product;
};
