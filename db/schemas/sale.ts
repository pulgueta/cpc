import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { relations } from "drizzle-orm";
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { createId } from "@paralleldrive/cuid2";

import { stores } from "./store";
import { products } from "./product";
import { user } from "./user";

export const sale = pgTable("sale", {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  storeId: text()
    .notNull()
    .references(() => stores.id, { onDelete: "cascade" }),
  ownerId: text()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  documentType: text({ enum: ["CC", "TI", "CE", "NIT"] }).notNull(),
  document: text().notNull(),
  buyerEmail: text(),
  buyerName: text().notNull(),
  buyerPhone: text().notNull(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().$onUpdateFn(() => new Date()),
});

export const saleItem = pgTable("saleItem", {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  saleId: text()
    .notNull()
    .references(() => sale.id, { onDelete: "cascade" }),
  productId: text()
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  quantity: integer().notNull(),
  price: integer().notNull(),
});

export const saleItemRelations = relations(saleItem, ({ many }) => ({
  products: many(products),
}));

export type NewSaleItem = InferInsertModel<typeof saleItem>;
export type SaleItem = InferSelectModel<typeof saleItem>;

export type NewSale = InferInsertModel<typeof sale>;
export type Sale = InferSelectModel<typeof sale>;
