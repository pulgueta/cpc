import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { blob, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { createId } from "@paralleldrive/cuid2";

export const invoice = sqliteTable("invoices", {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  invoiceNumber: text().notNull(),
  invoiceCustomerEmail: text().notNull(),
  invoiceCustomerName: text().notNull(),
  invoiceCustomerPhone: text().notNull(),
  invoiceProducts: blob({ mode: "json" }).$type<string[]>().notNull(),
  invoiceTotal: integer().notNull(),
  createdAt: text().$defaultFn(() => new Date().toISOString()),
});

// @ts-expect-error
export type NewInvoice = InferInsertModel<typeof invoice>;
// @ts-expect-error
export type Invoice = InferSelectModel<typeof invoice>;
