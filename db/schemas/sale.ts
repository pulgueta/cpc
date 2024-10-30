import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { relations } from "drizzle-orm";
import { timestamp, pgTable, text, integer } from "drizzle-orm/pg-core";

import { createId } from "@paralleldrive/cuid2";

import { products } from "./product";

export const sales = pgTable("sale", {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  documentType: text({ enum: ["CC", "TI", "CE", "NIT"] }).notNull(),
  document: text().notNull(),
  buyerEmail: text(),
  buyerName: text().notNull(),
  buyerPhone: text().notNull(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().$onUpdateFn(() => new Date()),
});

export const saleProducts = pgTable("sale_product", {
  saleId: text()
    .notNull()
    .references(() => sales.id),
  productId: text()
    .notNull()
    .references(() => products.id),
  quantity: integer().notNull(),
});

export const saleRelations = relations(sales, ({ many }) => ({
  products: many(saleProducts),
}));

export const saleProductRelations = relations(saleProducts, ({ one }) => ({
  sale: one(sales, {
    fields: [saleProducts.saleId],
    references: [sales.id],
  }),
  product: one(products, {
    fields: [saleProducts.productId],
    references: [products.id],
  }),
}));

export type NewSale = InferInsertModel<typeof sales>;
export type Sale = InferSelectModel<typeof sales>;
