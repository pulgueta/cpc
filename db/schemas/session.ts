import type { InferSelectModel } from "drizzle-orm";
import { timestamp, pgTable, text } from "drizzle-orm/pg-core";

import { user } from "./user";

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expiresAt").notNull(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  impersonatedBy: text("impersonatedBy").references(() => user.id),
  activeOrganizationId: text("activeOrganizationId"),
});

export type Session = InferSelectModel<typeof session>;
