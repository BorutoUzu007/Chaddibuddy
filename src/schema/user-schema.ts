import { integer, pgTable, primaryKey, text } from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters"

export const users = pgTable("user", {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").unique(),
    image: text("image"),
    bio: text("bio"),
    daily_task_outline: text("daily_task_outline"),
    weekly_task_outline: text("weekly_task_outline"),
    monthly_task_outline: text("monthly_task_outline"),
    yearly_task_outline: text("yearly_task_outline"),
    custom_task_outline: text("custom_task_outline")
  })

  export const accounts = pgTable(
    "account",
    {
      userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
      type: text("type").$type<AdapterAccountType>().notNull(),
      provider: text("provider").notNull(),
      providerAccountId: text("providerAccountId").notNull(),
      refresh_token: text("refresh_token"),
      access_token: text("access_token"),
      expires_at: integer("expires_at"),
      token_type: text("token_type"),
      scope: text("scope"),
      id_token: text("id_token"),
      session_state: text("session_state"),
    },
    (account) => ({
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    })
  )