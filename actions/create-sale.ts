"use server";

import { createSaleSchema } from "@/schemas/sale";

export const createSaleAction = async (_prev: unknown, e: FormData) => {
  const body = createSaleSchema.safeParse(Object.fromEntries(e.entries()));

  if (!body.success) {
    return { error: body.error };
  }

  return {};
};
