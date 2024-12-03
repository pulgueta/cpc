import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { relations } from "drizzle-orm";
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { createId } from "@paralleldrive/cuid2";

import { stores } from "./store";
import { products } from "./product";
import { user } from "./user";
import { getRandomValues } from "@/lib/crypto/random-vals";

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
  total: integer().notNull(),
  invoiceNumber: text()
    .unique()
    .$defaultFn(() => getRandomValues(8)),
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
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().$onUpdateFn(() => new Date()),
});

export const saleRelations = relations(sale, ({ many }) => ({
  saleItems: many(saleItem),
}));

export const saleItemRelations = relations(saleItem, ({ one }) => ({
  sale: one(sale, {
    fields: [saleItem.saleId],
    references: [sale.id],
  }),
  products: one(products, {
    fields: [saleItem.productId],
    references: [products.id],
  }),
}));

export type NewSaleItem = InferInsertModel<typeof saleItem>;
export type SaleItem = InferSelectModel<typeof saleItem>;

export type NewSale = InferInsertModel<typeof sale>;
export type Sale = InferSelectModel<typeof sale>;
