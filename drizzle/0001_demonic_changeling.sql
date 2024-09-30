DO $$ BEGIN
 CREATE TYPE "public"."frequency" AS ENUM('DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY', 'CUSTOM');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "todo" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"createdAt" timestamp,
	"updatedAt" timestamp,
	"frequency" "frequency",
	"taskHeading" text NOT NULL,
	"taskDescription" text,
	"completedDates" json,
	"isDeleted" boolean DEFAULT false,
	"isActive" boolean DEFAULT true
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "todo" ADD CONSTRAINT "todo_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
