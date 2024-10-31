import { pgTable, text, integer, timestamp, boolean } from "drizzle-orm/pg-core";

import { user } from "./user";

export const passkey = pgTable("passkey", {
  id: text().primaryKey(),
  name: text(),
  publicKey: text().notNull(),
  userId: text()
    .unique()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  webauthnUserID: text().notNull(),
  counter: integer().notNull(),
  deviceType: text().notNull(),
  backedUp: boolean().notNull(),
  transports: text(),
  createdAt: timestamp(),
});
