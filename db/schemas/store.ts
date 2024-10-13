import type { InferInsertModel } from "drizzle-orm";
import { relations } from "drizzle-orm";
import { timestamp, pgTable, text } from "drizzle-orm/pg-core";

import { createId } from "@paralleldrive/cuid2";

export const stores = pgTable("store", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  document: text("document").unique().notNull(),
  phone: text("phone").notNull(),
  role: text("role", { enum: ["admin", "storeOwner", "store"] }).default("store"),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).$onUpdateFn(() => new Date()),
});

export type NewUser = InferInsertModel<typeof stores>;
