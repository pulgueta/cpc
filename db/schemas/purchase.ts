import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { relations } from "drizzle-orm";
import { timestamp, pgTable, text, index } from "drizzle-orm/pg-core";

import { createId } from "@paralleldrive/cuid2";

import { user } from "./user";

export const purchases = pgTable("purchase", {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  purchasedBy: text()
    .notNull()
    .references(() => user.id),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().$onUpdateFn(() => new Date()),
});

export const purchaseRelations = relations(purchases, ({ one }) => ({
  owner: one(user),
}));

export type NewProduct = InferInsertModel<typeof purchases>;
export type Product = InferSelectModel<typeof purchases>;
