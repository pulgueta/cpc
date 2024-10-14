import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, serial, text } from "drizzle-orm/pg-core";

import { users } from "./user";

export const accounts = pgTable("accounts", {
  id: serial().primaryKey(),
  userId: text()
    .unique()
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  googleId: text().unique(),
});

export type NewAccount = InferInsertModel<typeof accounts>;
export type Account = InferSelectModel<typeof accounts>;
