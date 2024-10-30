import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { timestamp, pgTable, text } from "drizzle-orm/pg-core";

import { createId } from "@paralleldrive/cuid2";

export const categories = pgTable("category", {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  categorytName: text().notNull(),
  categoryDescription: text(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().$onUpdateFn(() => new Date()),
});

export type NewCategory = InferInsertModel<typeof categories>;
export type Category = InferSelectModel<typeof categories>;
