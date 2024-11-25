import type { InferSelectModel } from "drizzle-orm";
import { timestamp, pgTable, text } from "drizzle-orm/pg-core";

import { user } from "./user";

export const session = pgTable("session", {
  id: text().primaryKey(),
  expiresAt: timestamp().notNull(),
  token: text().notNull().unique(),
  ipAddress: text(),
  userAgent: text(),
  userId: text()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  impersonatedBy: text(),
  activeOrganizationId: text(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().$onUpdateFn(() => new Date()),
});

export type Session = InferSelectModel<typeof session>;
