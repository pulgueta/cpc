import type { InferInsertModel } from "drizzle-orm";
import { relations } from "drizzle-orm";
import { timestamp, pgTable, text } from "drizzle-orm/pg-core";

import { createId } from "@paralleldrive/cuid2";

import { stores } from "./store";

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  document: text("document").unique(),
  phone: text("phone"),
  role: text("role", { enum: ["admin", "storeOwner", "user"] }).default("user"),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).$onUpdateFn(
    () => new Date(),
  ),
});

export const userRelations = relations(stores, ({ many }) => ({
  stores: many(stores),
}));

export type NewUser = InferInsertModel<typeof users>;
