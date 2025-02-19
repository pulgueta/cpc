"use server";

import { revalidateTag } from "next/cache";

import { createSaleWithProducts } from "@/lib/database/sale";
import { sendInvoiceEmail } from "@/lib/email";
import { createSaleSchema } from "@/schemas/sale";
import { handleAction } from "../handle-action";

export const createSaleAction = async (_prev: unknown, e: FormData) => {
  const sale = await handleAction(createSaleSchema, e);

  if ("error" in sale) {
    return {
      defaultValues: sale.defaultValues,
      error: sale.error,
    };
  }

  const createdSale = await createSaleWithProducts(sale, JSON.parse(sale.products));

  if (sale.buyerEmail?.length) {
    await sendInvoiceEmail(
      sale.buyerEmail,
      createdSale.buyerName,
      createdSale.createdAt!,
      JSON.parse(sale.products),
    );
  }

  revalidateTag("sales");

  return {
    message: "Venta creada exitosamente",
  };
};
