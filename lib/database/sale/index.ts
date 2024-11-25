import { db } from "@/db/config";
import type { NewSale, Sale } from "@/db/schemas/sale";
import { sale as sales, saleItem } from "@/db/schemas/sale";

export const createSaleWithProducts = async (
  saleData: NewSale,
  products: { productId: string; quantity: number; price: number }[],
) => {
  const transaction = await db.transaction(async (trx) => {
    const [sale] = await trx.insert(sales).values(saleData).returning();

    const saleItemsWithSaleId = products.map((item) => ({
      ...item,
      saleId: sale.id,
    }));

    const saleWithProducts = await trx.insert(saleItem).values(saleItemsWithSaleId).returning();

    return [sale, saleWithProducts] as const;
  });

  return transaction;
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

export const getStoreSales = async (storeId: Sale["storeId"], limit = 15, offset = 0) => {
  const sales = await db.query.sale.findMany({
    where: (t, { eq }) => eq(t.storeId, storeId),
    limit,
    offset,
    orderBy: ({ createdAt }, { asc }) => [asc(createdAt)],
  });

  return sales;
};
