import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { timestamp, pgTable, text } from "drizzle-orm/pg-core";

import { createId } from "@paralleldrive/cuid2";

import { users } from "./user";

export const stores = pgTable("store", {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text().notNull(),
  ownerId: text()
    .notNull()
    .references(() => users.id),
  mainContactPhone: text().notNull(),
  image: text(),
  createdAt: timestamp({ mode: "date" }).defaultNow(),
  updatedAt: timestamp({ mode: "date" }).$onUpdateFn(() => new Date()),
});

export type NewStore = InferInsertModel<typeof stores>;
export type Store = InferSelectModel<typeof stores>;
