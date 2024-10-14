import type { InferSelectModel } from "drizzle-orm";
import { timestamp, pgTable, text } from "drizzle-orm/pg-core";

import { users } from "./user";

export const sessions = pgTable("session", {
  id: text().primaryKey(),
  userId: text()
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expiresAt: timestamp({ mode: "date", withTimezone: true }).notNull(),
});

export type Session = InferSelectModel<typeof sessions>;
