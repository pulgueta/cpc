import { pgTable, text, integer, timestamp, boolean } from "drizzle-orm/pg-core";

import { user } from "./user";

export const passkey = pgTable("passkey", {
  id: text("id").primaryKey(),
  name: text("name"),
  publicKey: text("publicKey").notNull(),
  userId: text("userId")
    .unique()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  webauthnUserID: text("webauthnUserID").notNull(),
  counter: integer("counter").notNull(),
  deviceType: text("deviceType").notNull(),
  backedUp: boolean("backedUp").notNull(),
  transports: text("transports"),
  createdAt: timestamp("createdAt"),
});
