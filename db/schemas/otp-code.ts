import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { createId } from "@paralleldrive/cuid2";

import { users } from "./user";

export const otpCode = pgTable("otp_code", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  code: text("code").notNull(),
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at").$defaultFn(() => new Date(Date.now() + 1000 * 60 * 10)),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdateFn(() => new Date()),
});

export type NewOTPCode = InferInsertModel<typeof otpCode>;
export type OTPCode = InferSelectModel<typeof otpCode>;
