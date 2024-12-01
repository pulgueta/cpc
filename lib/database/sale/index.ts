import { eq, sql } from "drizzle-orm";

import { db } from "@/db/config";
import type { Store } from "@/db/schemas/store";
import type { NewSale, Sale } from "@/db/schemas/sale";
import { sale as saleTable } from "@/db/schemas/sale";
import { sale as sales, saleItem } from "@/db/schemas/sale";
import { products as productTable } from "@/db/schemas/product";
import { getCurrentSession } from "@/lib/auth/session";

export const createSaleWithProducts = async (
  saleData: NewSale,
  products: { productId: string; quantity: number; price: number }[]
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

export const getSalesWithItems = async (saleId: Sale["id"]) => {
  const transaction = await db.transaction(async (trx) => {
    const saleDetails = await trx.query.sale.findMany({
      where: (t, { eq }) => eq(t.id, saleId),
      limit: 1,
    });

    const items = await trx.query.saleItem.findMany({
      where: (t, { eq }) => eq(t.saleId, saleId),
      with: {
        products: true,
      },
    });

    return [saleDetails, items] as const;
  });

  return transaction;
};

export const getStoreSales = async (
  storeId: Sale["storeId"],
  limit = 15,
  offset = 0
) => {
  const sales = await db.query.sale.findMany({
    where: (t, { eq }) => eq(t.storeId, storeId),

    limit,
    offset,
    orderBy: ({ createdAt }, { asc }) => [asc(createdAt)],
  });

  return sales;
};

export const getStoreSalesGoal = async (slug: Store["slug"]) => {
  const owner = await getCurrentSession();

  const currentStore = await db.query.stores.findFirst({
    where: (t, { eq, and }) =>
      and(eq(t.ownerId, owner?.user.id ?? ""), eq(t.slug, slug)),
  });

  return currentStore?.salesGoal;
};
