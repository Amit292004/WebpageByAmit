import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  mobile: text("mobile").notNull(),
  role: text("role").notNull().default("user"), // "user" or "admin"
});

export const enrollments = pgTable("enrollments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  class: text("class").notNull(),
  phone: text("phone").notNull(),
  whatsapp: text("whatsapp").notNull(),
  address: text("address").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const questionPapers = pgTable("question_papers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  class: integer("class").notNull(), // 8, 9, 10, 11, 12
  subject: text("subject").notNull(),
  year: integer("year").notNull(),
  phase: text("phase").notNull(), // "Phase 1", "Phase 2", "Board Exam"
  fileUrl: text("file_url").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const videos = pgTable("videos", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  class: integer("class").notNull(),
  subject: text("subject").notNull(),
  youtubeUrl: text("youtube_url").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  duration: text("duration"),
  views: integer("views").default(0),
  uploadDate: text("upload_date"),
  category: text("category"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const feedback = pgTable("feedback", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email"),
  message: text("message").notNull(),
  rating: integer("rating"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const notes = pgTable("notes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  class: integer("class").notNull(),
  subject: text("subject").notNull(),
  fileUrl: text("file_url").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  mobile: true,
  role: true,
});

export const insertEnrollmentSchema = createInsertSchema(enrollments).pick({
  name: true,
  class: true,
  phone: true,
  whatsapp: true,
  address: true,
});

export const insertQuestionPaperSchema = createInsertSchema(questionPapers).pick({
  title: true,
  class: true,
  subject: true,
  year: true,
  phase: true,
  fileUrl: true,
});

export const insertVideoSchema = createInsertSchema(videos).pick({
  title: true,
  description: true,
  class: true,
  subject: true,
  youtubeUrl: true,
  thumbnailUrl: true,
  duration: true,
  views: true,
  uploadDate: true,
  category: true,
});

export const insertFeedbackSchema = createInsertSchema(feedback).pick({
  name: true,
  email: true,
  message: true,
  rating: true,
});

export const insertNoteSchema = createInsertSchema(notes).pick({
  title: true,
  description: true,
  class: true,
  subject: true,
  fileUrl: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertQuestionPaper = z.infer<typeof insertQuestionPaperSchema>;
export type QuestionPaper = typeof questionPapers.$inferSelect;

export type InsertVideo = z.infer<typeof insertVideoSchema>;
export type Video = typeof videos.$inferSelect;

export type InsertFeedback = z.infer<typeof insertFeedbackSchema>;
export type Feedback = typeof feedback.$inferSelect;

export type InsertNote = z.infer<typeof insertNoteSchema>;
export type Notes = typeof notes.$inferSelect;

export type InsertEnrollment = z.infer<typeof insertEnrollmentSchema>;
export type Enrollment = typeof enrollments.$inferSelect;
