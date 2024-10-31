import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { user } from "./user";

export const account = pgTable("account", {
  id: text().primaryKey(),
  accountId: text().notNull(),
  providerId: text().notNull(),
  userId: text()
    .unique()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text(),
  refreshToken: text(),
  idToken: text(),
  expiresAt: timestamp(),
  password: text(),
});

export type NewAccount = InferInsertModel<typeof account>;
export type Account = InferSelectModel<typeof account>;
