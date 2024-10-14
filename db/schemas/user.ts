import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { relations } from "drizzle-orm";
import { timestamp, pgTable, text } from "drizzle-orm/pg-core";

import { createId } from "@paralleldrive/cuid2";

import { stores } from "./store";

export const users = pgTable("user", {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text().notNull(),
  email: text().unique().notNull(),
  password: text().notNull(),
  document: text().unique(),
  phone: text(),
  role: text({ enum: ["admin", "storeOwner", "user"] }).default("user"),
  emailVerified: timestamp({ mode: "date" }),
  image: text(),
  googleId: text().unique(),
  createdAt: timestamp({ mode: "date" }).defaultNow(),
  updatedAt: timestamp({ mode: "date" }).$onUpdateFn(() => new Date()),
});

export const userRelations = relations(stores, ({ many }) => ({
  stores: many(stores),
}));

export type NewUser = InferInsertModel<typeof users>;
export type User = InferSelectModel<typeof users>;
