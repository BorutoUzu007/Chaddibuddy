import { boolean, json, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "@/src/schema/user-schema";

export const todoFrequency = pgEnum('frequency', ["DAILY", "WEEKLY", "MONTHLY", "YEARLY", "CUSTOM"])

export const todos = pgTable("todo", {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("createdAt", { mode: "date" }),
    updatedAt: timestamp("updatedAt", { mode: "date" }),
    frequency: todoFrequency("frequency"),
    taskHeading: text("taskHeading").notNull(),
    taskDescription: text("taskDescription"),
    taskTime: text("taskTime"),
    completedDates: json("completedDates").$type<string[]>().default([]),
    completedWeek: json("completedWeek").$type<string[]>().default([]),
    completedMonth: json("completedMonth").$type<string[]>().default([]),
    completedYear: json("completedYear").$type<string[]>().default([]),
    isDeleted: boolean("isDeleted").default(false),
    isActive: boolean("isActive").default(true),
    firstTriggerDate: timestamp("firstTriggerDate", { mode: "date" }),
})