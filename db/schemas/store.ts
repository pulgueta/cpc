import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { relations } from "drizzle-orm";
import { timestamp, pgTable, text, index } from "drizzle-orm/pg-core";

import { createId } from "@paralleldrive/cuid2";

import { users } from "./user";

export const stores = pgTable(
  "store",
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => createId()),
    name: text().notNull(),
    ownerId: text()
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    mainContactPhone: text().notNull(),
    image: text(),
    createdAt: timestamp({ mode: "date" }).defaultNow(),
    updatedAt: timestamp({ mode: "date" }).$onUpdateFn(() => new Date()),
  },
  (t) => ({
    storeIdx: index("store_idx").on(t.name),
  })
);

export const storesRelations = relations(stores, ({ one }) => ({
  owner: one(users),
}));

export type NewStore = InferInsertModel<typeof stores>;
export type Store = InferSelectModel<typeof stores>;
