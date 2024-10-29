import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { relations } from "drizzle-orm";
import { timestamp, pgTable, text, boolean, integer } from "drizzle-orm/pg-core";

import { createId } from "@paralleldrive/cuid2";

import { stores } from "./store";

export const user = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password"),
  emailVerified: boolean("emailVerified"),
  image: text("image"),
  role: text("role").notNull(),
  banned: boolean("banned"),
  banReason: text("banReason"),
  banExpires: integer("banExpires"),
  document: text("document").unique(),
  plan: text("plan", { enum: ["free", "pro"] }),
  phone: text("phone").unique(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt")
    .notNull()
    .$onUpdateFn(() => new Date()),
});

export const userRelations = relations(user, ({ many }) => ({
  stores: many(stores),
}));

export type NewUser = InferInsertModel<typeof user>;
export type User = InferSelectModel<typeof user>;
