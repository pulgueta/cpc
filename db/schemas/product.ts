import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { relations } from "drizzle-orm";
import { timestamp, pgTable, text, index, integer } from "drizzle-orm/pg-core";

import { createId } from "@paralleldrive/cuid2";

import { user } from "./user";
import { categories } from "./category";

export const products = pgTable(
  "product",
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => createId()),
    productName: text().notNull(),
    productDescription: text(),
    productPrice: integer().notNull(),
    productImage: text().notNull(),
    productCategory: text()
      .notNull()
      .references(() => categories.id),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp().$onUpdateFn(() => new Date()),
  },
  (t) => ({
    productIdx: index("product_idx").on(t.productName),
  })
);

export const productRelations = relations(products, ({ one }) => ({
  storeOwner: one(user),
  category: one(categories),
}));

export type NewProduct = InferInsertModel<typeof products>;
export type Product = InferSelectModel<typeof products>;
