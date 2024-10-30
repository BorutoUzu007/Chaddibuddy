ALTER TABLE "todo" ADD COLUMN "completedWeek" json DEFAULT '[]'::json;--> statement-breakpoint
ALTER TABLE "todo" ADD COLUMN "completedMonth" json DEFAULT '[]'::json;--> statement-breakpoint
ALTER TABLE "todo" ADD COLUMN "completedYear" json DEFAULT '[]'::json;