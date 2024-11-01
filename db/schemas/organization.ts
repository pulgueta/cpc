import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const organization = pgTable("organization", {
  id: text().primaryKey(),
  name: text().notNull(),
  slug: text().unique(),
  logo: text(),
  createdAt: timestamp().defaultNow(),
  metadata: text(),
});

export type NewOrganization = InferInsertModel<typeof organization>;
export type Organization = InferSelectModel<typeof organization>;
