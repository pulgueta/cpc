import { unstable_cache as cache } from "next/cache";

import type { NewProduct, Product } from "@/db/schemas/product";
import { products } from "@/db/schemas/product";
import { db } from "@/db/config";

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

// export const getProductByCategory = cache(
//   async (productCategory: Product["productCategory"]) => {
//     const product = await db.query.products.findFirst({
//       where: (t, { eq }) => eq(t.productCategory, productCategory),
//     });

//     return product;
//   },
//   ["products"],
//   { revalidate: 3600, tags: ["products"] }
// );

export const getProducts = cache(
  async (storeOwnerId: Product["storeOwnerId"], page: number = 1, pageSize: number = 15) => {
    const products = await db.query.products.findMany({
      where: (t, { eq }) => eq(t.storeOwnerId, storeOwnerId),
      with: {
        category: true,
        // storeOwner: {
        //   columns: {
        //     id: true,
        //   },
        // },
      },
      limit: pageSize,
      offset: (page - 1) * pageSize,
      orderBy: (t, { asc }) => [asc(t.createdAt)],
    });

    return products;
  },
  ["products"],
  { revalidate: 3600, tags: ["products"] },
);
