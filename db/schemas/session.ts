import type { InferSelectModel } from "drizzle-orm";
import { timestamp, pgTable, text } from "drizzle-orm/pg-core";

import { user } from "./user";

export const session = pgTable("session", {
  id: text().primaryKey(),
  expiresAt: timestamp().notNull(),
  ipAddress: text(),
  userAgent: text(),
  userId: text()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  impersonatedBy: text().references(() => user.id, { onDelete: "cascade" }),
  activeOrganizationId: text(),
});

export type Session = InferSelectModel<typeof session>;
