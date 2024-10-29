import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { relations } from "drizzle-orm";
import { timestamp, pgTable, text, index } from "drizzle-orm/pg-core";

import { createId } from "@paralleldrive/cuid2";

import { user } from "./user";

export const products = pgTable(
  "product",
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => createId()),
    productName: text().notNull(),
    productDescription: text().notNull(),
    productPrice: text().notNull(),
    productImage: text().notNull(),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp().$onUpdateFn(() => new Date()),
  },
  (t) => ({
    productIdx: index("product_idx").on(t.productName),
  }),
);

export const productRelations = relations(products, ({ one }) => ({
  owner: one(user),
}));

export type NewProduct = InferInsertModel<typeof products>;
export type Product = InferSelectModel<typeof products>;
