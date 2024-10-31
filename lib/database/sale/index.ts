import { db } from "@/db/config";
import type { NewSale } from "@/db/schemas/sale";
import { sales, saleProducts } from "@/db/schemas/sale";

export const createSaleWithProducts = async (
  saleData: NewSale,
  products: { productId: string; quantity: number }[],
) => {
  await db.transaction(async (trx) => {
    const [sale] = await trx.insert(sales).values(saleData).returning();

    const saleProductEntries = products.map((product) => ({
      saleId: sale.id,
      productId: product.productId,
      quantity: product.quantity,
    }));

    await trx.insert(saleProducts).values(saleProductEntries);
  });
};
