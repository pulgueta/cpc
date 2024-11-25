import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";

import { user } from "./user";

export const twoFactor = pgTable("twoFactor", {
  id: text().primaryKey(),
  secret: text().notNull(),
  backupCodes: text().notNull(),
  userId: text()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export type NewTwoFactor = InferInsertModel<typeof twoFactor>;
export type TwoFactor = InferSelectModel<typeof twoFactor>;
