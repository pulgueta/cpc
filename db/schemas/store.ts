import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { relations } from "drizzle-orm";
import { timestamp, pgTable, text, index, integer } from "drizzle-orm/pg-core";

import { createId } from "@paralleldrive/cuid2";

import { user } from "./user";
import { products } from "./product";
import { categories } from "./category";

export const stores = pgTable(
  "store",
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => createId()),
    name: text().notNull(),
    ownerId: text()
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    mainContactPhone: text().notNull(),
    image: text(),
    salesGoal: integer().notNull(),
    createdAt: timestamp({ mode: "date" }).defaultNow(),
    updatedAt: timestamp({ mode: "date" }).$onUpdateFn(() => new Date()),
  },
  (t) => ({
    storeIdx: index("store_idx").on(t.name),
  }),
);

export const storesRelations = relations(stores, ({ one, many }) => ({
  owner: one(user),
  products: many(products),
  categories: many(categories),
}));

export type NewStore = InferInsertModel<typeof stores>;
export type Store = InferSelectModel<typeof stores>;
