import { createInsertSchema } from "drizzle-zod";
import { TypeOf } from "zod";

import { sales } from "@/db/schemas/sale";

export const createSaleSchema = createInsertSchema(sales, {});

export type SaleSchema = TypeOf<typeof createSaleSchema>;
