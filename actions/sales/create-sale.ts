"use server";

import { createSaleSchema } from "@/schemas/sale";
import { handleAction } from "../handle-action";

export const createSaleAction = async (_prev: unknown, e: FormData) => {
  const sale = await handleAction(createSaleSchema, e);

  if ("error" in sale) {
    return { error: sale.error };
  }

  return {
    message: "Venta creada exitosamente",
  };
};
