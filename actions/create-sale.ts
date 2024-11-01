"use server";

import { createSaleSchema } from "@/schemas/sale";

export const createSaleAction = async (_prev: unknown, e: FormData) => {
  const body = createSaleSchema.safeParse(Object.fromEntries(e.entries()));

  // console.log(Object.fromEntries(e.entries()));

  // console.log(body.error?.flatten().fieldErrors);

  if (!body.success) {
    return { error: body.error.flatten().fieldErrors };
  }

  return {
    message: "Venta creada exitosamente",
  };
};
