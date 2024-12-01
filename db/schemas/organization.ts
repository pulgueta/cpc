import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { stores } from "./store";

export const organization = pgTable("organization", {
  id: text().primaryKey(),
  name: text().notNull(),
  slug: text().unique(),
  logo: text(),
  createdAt: timestamp().defaultNow(),
  metadata: text(),
});

export const organizationRelations = relations(organization, ({ one }) => ({
  store: one(stores, {
    fields: [organization.id],
    references: [stores.orgId],
  }),
}));

export type NewOrganization = InferInsertModel<typeof organization>;
export type Organization = InferSelectModel<typeof organization>;
