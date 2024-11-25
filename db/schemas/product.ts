import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { relations } from "drizzle-orm";
import { timestamp, pgTable, text, index, integer } from "drizzle-orm/pg-core";

import { createId } from "@paralleldrive/cuid2";

import { user } from "./user";
import { categories } from "./category";
import { stores } from "./store";

export const products = pgTable(
  "product",
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => createId()),
    productName: text().notNull(),
    productDescription: text(),
    productPrice: integer().notNull(),
    productCategory: text()
      .notNull()
      .references(() => categories.id, { onDelete: "cascade" }),
    productImageUrl: text().notNull(),
    stock: integer().notNull(),
    storeOwnerId: text()
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    storeId: text()
      .notNull()
      .references(() => stores.id, { onDelete: "cascade" }),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp().$onUpdateFn(() => new Date()),
  },
  (t) => ({
    productIdx: index("product_idx").on(t.productName),
  }),
);

export const productRelations = relations(products, ({ one }) => ({
  store: one(stores, {
    fields: [products.storeId],
    references: [stores.id],
  }),
  storeOwner: one(user, {
    fields: [products.storeOwnerId],
    references: [user.id],
  }),
  category: one(categories, {
    fields: [products.productCategory],
    references: [categories.id],
  }),
}));

export type NewProduct = InferInsertModel<typeof products>;
export type Product = InferSelectModel<typeof products>;
