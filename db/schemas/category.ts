import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { timestamp, pgTable, text } from "drizzle-orm/pg-core";

import { createId } from "@paralleldrive/cuid2";

import { user } from "./user";

export const categories = pgTable("category", {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  categoryName: text().notNull(),
  categoryDescription: text(),
  storeOwnerId: text()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().$onUpdateFn(() => new Date()),
});

export type NewCategory = InferInsertModel<typeof categories>;
export type Category = InferSelectModel<typeof categories>;
