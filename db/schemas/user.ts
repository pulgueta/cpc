import { timestamp, pgTable, text } from "drizzle-orm/pg-core";

import { createId } from "@paralleldrive/cuid2";

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  document: text("document").unique().notNull(),
  phone: text("phone").notNull(),
  role: text("role", { enum: ["admin", "storeOwner", "user"] }).notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});
