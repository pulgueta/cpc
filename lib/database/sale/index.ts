import { unstable_cache as cache } from "next/cache";

import { eq, sql } from "drizzle-orm";

import { db } from "@/db/config";
import { products as productTable } from "@/db/schemas/product";
import type { NewSale, Sale } from "@/db/schemas/sale";
import { saleItem, sale as sales } from "@/db/schemas/sale";
import type { Store } from "@/db/schemas/store";
import { getCurrentSession } from "@/lib/auth/session";

export const createSaleWithProducts = async (
  saleData: NewSale,
  products: { productId: string; quantity: number; price: number }[],
) => {
  const [sale] = await db.insert(sales).values(saleData).returning();

  products.map(async (item) => {
    await db.batch([
      db
        .insert(saleItem)
        .values({
          price: item.price,
          productId: item.productId,
          quantity: item.quantity,
          saleId: sale.id,
        })
        .returning(),
      db
        .update(productTable)
        .set({
          stock: sql`${productTable.stock} - ${item.quantity}`,
        })
        .where(eq(productTable.id, item.productId))
        .returning(),
    ]);
  });

  return sale;
};

export const getStoreSales = cache(
  async (storeId: Sale["storeId"], limit = 1) => {
    const sales = await db.query.sale.findMany({
      where: (t, { eq }) => eq(t.storeId, storeId),
      with: {
        saleItems: {
          with: {
            products: true,
          },
        },
      },
      limit: limit * 11,
      orderBy: ({ createdAt }, { asc }) => [asc(createdAt)],
    });

    return sales;
  },
  ["sales"],
  { revalidate: 500, tags: ["sales"] },
);

export const getStoreSalesGoal = cache(
  async (slug: Store["slug"]) => {
    const owner = await getCurrentSession();

    const currentStore = await db.query.stores.findFirst({
      where: (t, { eq, and }) => and(eq(t.ownerId, owner?.user.id ?? ""), eq(t.slug, slug)),
    });

    return currentStore?.salesGoal;
  },
  ["salesGoal"],
  { revalidate: 7200, tags: ["salesGoal"] },
);
