"use server";

import { createSaleSchema } from "@/schemas/sale";
import { handleAction } from "../handle-action";
import { createSaleWithProducts } from "@/lib/database/sale";

export const createSaleAction = async (_prev: unknown, e: FormData) => {
  const sale = await handleAction(createSaleSchema, e);

  if ("error" in sale) {
    return {
      defaultValues: sale.defaultValues,
      error: sale.error,
    };
  }

  await createSaleWithProducts(sale, JSON.parse(sale.products));

  if (sale.buyerEmail) {
    console.log("Send email to", sale.buyerEmail);

    // send email
  }

  return {
    message: "Venta creada exitosamente",
  };
};
