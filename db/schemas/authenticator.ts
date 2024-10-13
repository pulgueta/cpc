import {
  pgTable,
  text,
  primaryKey,
  boolean,
  integer,
} from "drizzle-orm/pg-core";

import { users } from "./user";

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    pk: primaryKey({
      name: "authenticator_userId_credentialID_pk",
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  }),
);
