CREATE TABLE "enrollments" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"class" text NOT NULL,
	"phone" text NOT NULL,
	"whatsapp" text NOT NULL,
	"address" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "feedback" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid()! NOT NULL,
	"name" text NOT NULL,
	"email" text,
	"message" text NOT NULL,
	"rating" integer,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "notes" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid()! NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"class" integer NOT NULL,
	"subject" text NOT NULL,
	"file_url" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "question_papers" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"class" integer NOT NULL,
	"subject" text NOT NULL,
	"year" integer NOT NULL,
	"phase" text NOT NULL,
	"file_url" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"mobile" text NOT NULL,
	"role" text DEFAULT 'user' NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "videos" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"class" integer NOT NULL,
	"subject" text NOT NULL,
	"youtube_url" text NOT NULL,
	"thumbnail_url" text,
	"duration" text,
	"views" integer DEFAULT 0,
	"upload_date" text,
	"category" text,
	"created_at" timestamp DEFAULT now()
);
