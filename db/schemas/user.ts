import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { relations } from "drizzle-orm";
import { timestamp, pgTable, text, boolean, integer } from "drizzle-orm/pg-core";

import { createId } from "@paralleldrive/cuid2";

import { stores } from "./store";

export const user = pgTable("user", {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
  emailVerified: boolean(),
  image: text(),
  role: text({ enum: ["user", "storeOwner", "admin"] }).notNull(),
  banned: boolean(),
  banReason: text(),
  banExpires: integer(),
  document: text().unique(),
  documentType: text({ enum: ["CC", "CE", "NIT", "TI"] }),
  plan: text({ enum: ["free", "pro"] }),
  twoFactorEnabled: boolean().default(false),
  phone: text().unique(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp()
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

export const userRelations = relations(user, ({ many }) => ({
  stores: many(stores),
}));

export type NewUser = InferInsertModel<typeof user>;
export type User = InferSelectModel<typeof user>;
