import { IStorage } from './storage';
import { db, schema } from './db';
import { eq, and, like, count, sql } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import { type User, type InsertUser, type QuestionPaper, type InsertQuestionPaper, 
         type Video, type InsertVideo, type Feedback, type InsertFeedback, 
         type Enrollment, type InsertEnrollment, type Notes, type InsertNote } from '@shared/schema';
import { USE_MEMORY_STORAGE } from './env';

// Throw an error if db is null and we're not using memory storage
if (!db && !USE_MEMORY_STORAGE) {
  throw new Error('Database client is not initialized and USE_MEMORY_STORAGE is not set to true');
}

// Create a non-null assertion for db to use throughout the class
const dbClient = db!;

export class DbStorage implements IStorage {
  // User methods
  async getUsers(): Promise<User[]> {
    return await dbClient.select().from(schema.users);
  }

  async getUser(id: string): Promise<User | undefined> {
    const results = await dbClient.select().from(schema.users).where(eq(schema.users.id, id));
    return results[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const results = await dbClient.select().from(schema.users).where(eq(schema.users.username, username));
    return results[0];
  }

  async getUserByMobile(mobile: string): Promise<User | undefined> {
    const results = await dbClient.select().from(schema.users).where(eq(schema.users.mobile, mobile));
    return results[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const newUser = {
      id: randomUUID(),
      ...user,
      // Ensure role is always a string, default to 'user' if not provided
      role: user.role || 'user'
    };
    await dbClient.insert(schema.users).values(newUser);
    return newUser;
  }

  async deleteUser(id: string): Promise<boolean> {
    try {
      await dbClient.delete(schema.users).where(eq(schema.users.id, id));
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  }

  // Question paper methods
  async getQuestionPapers(filters?: { class?: number; subject?: string; year?: number; phase?: string }): Promise<QuestionPaper[]> {
    if (!filters) {
      return await dbClient.select().from(schema.questionPapers).execute();
    }
    
    const conditions = [];
    
    if (filters.class !== undefined) {
      conditions.push(eq(schema.questionPapers.class, filters.class));
    }
    
    if (filters.subject) {
      conditions.push(eq(schema.questionPapers.subject, filters.subject));
    }
    
    if (filters.year !== undefined) {
      conditions.push(eq(schema.questionPapers.year, filters.year));
    }
    
    if (filters.phase) {
      conditions.push(eq(schema.questionPapers.phase, filters.phase));
    }
    
    if (conditions.length === 0) {
      return await dbClient.select().from(schema.questionPapers).execute();
    }
    
    return await dbClient.select().from(schema.questionPapers).where(and(...conditions)).execute();
  }

  async getQuestionPaper(id: string): Promise<QuestionPaper | undefined> {
    const results = await dbClient.select().from(schema.questionPapers).where(eq(schema.questionPapers.id, id));
    return results[0];
  }

  async getQuestionPaperById(id: string): Promise<QuestionPaper | undefined> {
    const results = await dbClient.select().from(schema.questionPapers).where(eq(schema.questionPapers.id, id));
    return results[0];
  }

  async createQuestionPaper(paper: InsertQuestionPaper): Promise<QuestionPaper> {
    const newPaper = {
      id: randomUUID(),
      ...paper,
      createdAt: new Date(),
    };
    await dbClient.insert(schema.questionPapers).values(newPaper);
    return newPaper;
  }

  async updateQuestionPaper(id: string, paper: Partial<InsertQuestionPaper>): Promise<QuestionPaper | undefined> {
    const existingPaper = await this.getQuestionPaper(id);
    
    if (!existingPaper) {
      return undefined;
    }
    
    const updatedPaper = { ...existingPaper, ...paper };
    await dbClient.update(schema.questionPapers)
      .set(updatedPaper)
      .where(eq(schema.questionPapers.id, id));
    
    return updatedPaper;
  }

  async deleteQuestionPaper(id: string): Promise<boolean> {
    try {
      await dbClient.delete(schema.questionPapers).where(eq(schema.questionPapers.id, id));
      return true;
    } catch (error) {
      console.error('Error deleting question paper:', error);
      return false;
    }
  }

  // Video methods
  async getVideos(filters?: { class?: number; subject?: string }): Promise<Video[]> {
    if (!filters) {
      return await dbClient.select().from(schema.videos).execute();
    }
    
    const conditions = [];
    
    if (filters.class !== undefined) {
      conditions.push(eq(schema.videos.class, filters.class));
    }
    
    if (filters.subject) {
      conditions.push(eq(schema.videos.subject, filters.subject));
    }
    
    if (conditions.length === 0) {
      return await dbClient.select().from(schema.videos).execute();
    }
    
    return await dbClient.select().from(schema.videos).where(and(...conditions)).execute();
  }

  async getVideo(id: string): Promise<Video | undefined> {
    const results = await dbClient.select().from(schema.videos).where(eq(schema.videos.id, id));
    return results[0];
  }

  async createVideo(video: InsertVideo): Promise<Video> {
    const newVideo = {
      id: randomUUID(),
      ...video,
      createdAt: new Date(),
      // Ensure all required properties have non-undefined values
      description: video.description ?? null,
      thumbnailUrl: video.thumbnailUrl ?? null,
      duration: video.duration ?? null,
      views: video.views ?? null,
      uploadDate: video.uploadDate ?? null,
      category: video.category ?? null
    };
    await dbClient.insert(schema.videos).values(newVideo);
    return newVideo;
  }

  async updateVideo(id: string, video: Partial<InsertVideo>): Promise<Video | undefined> {
    const existingVideo = await this.getVideo(id);
    
    if (!existingVideo) {
      return undefined;
    }
    
    const updatedVideo = { ...existingVideo, ...video };
    await dbClient.update(schema.videos)
      .set(updatedVideo)
      .where(eq(schema.videos.id, id));
    
    return updatedVideo;
  }

  async deleteVideo(id: string): Promise<boolean> {
    try {
      await dbClient.delete(schema.videos).where(eq(schema.videos.id, id));
      return true;
    } catch (error) {
      console.error('Error deleting video:', error);
      return false;
    }
  }

  // Notes methods
  async getNotes(filters?: { class?: number; subject?: string }): Promise<Notes[]> {
    if (!filters) {
      return await dbClient.select().from(schema.notes).execute();
    }
    
    const conditions = [];
    
    if (filters.class !== undefined) {
      conditions.push(eq(schema.notes.class, filters.class));
    }
    
    if (filters.subject) {
      conditions.push(eq(schema.notes.subject, filters.subject));
    }
    
    if (conditions.length === 0) {
      return await dbClient.select().from(schema.notes).execute();
    }
    
    return await dbClient.select().from(schema.notes).where(and(...conditions)).execute();
  }

  async getNoteById(id: string): Promise<Notes | undefined> {
    const results = await dbClient.select().from(schema.notes).where(eq(schema.notes.id, id));
    return results[0];
  }

  async createNote(note: InsertNote): Promise<Notes> {
    const newNote = {
      id: randomUUID(),
      ...note,
      createdAt: new Date(),
      // Ensure description is not undefined
      description: note.description ?? null,
    };
    await dbClient.insert(schema.notes).values(newNote);
    return newNote;
  }

  async updateNote(id: string, note: Partial<InsertNote>): Promise<Notes | undefined> {
    const existingNote = await this.getNoteById(id);
    
    if (!existingNote) {
      return undefined;
    }
    
    const updatedNote = { ...existingNote, ...note };
    await dbClient.update(schema.notes)
      .set(updatedNote)
      .where(eq(schema.notes.id, id));
    
    return updatedNote;
  }

  async deleteNote(id: string): Promise<boolean> {
    try {
      await dbClient.delete(schema.notes).where(eq(schema.notes.id, id));
      return true;
    } catch (error) {
      console.error('Error deleting note:', error);
      return false;
    }
  }

  // Feedback methods
  async getFeedback(): Promise<Feedback[]> {
    return await dbClient.select().from(schema.feedback);
  }

  async createFeedback(feedback: InsertFeedback): Promise<Feedback> {
    const newFeedback = {
      id: randomUUID(),
      ...feedback,
      createdAt: new Date(),
      // Ensure optional properties are not undefined
      email: feedback.email ?? null,
      rating: feedback.rating ?? null
    };
    await dbClient.insert(schema.feedback).values(newFeedback);
    return newFeedback;
  }

  async deleteFeedback(id: string): Promise<boolean> {
    try {
      await dbClient.delete(schema.feedback).where(eq(schema.feedback.id, id));
      return true;
    } catch (error) {
      console.error('Error deleting feedback:', error);
      return false;
    }
  }

  // Enrollment methods
  async getEnrollments(): Promise<Enrollment[]> {
    return await dbClient.select().from(schema.enrollments);
  }

  async getEnrollment(id: string): Promise<Enrollment | undefined> {
    const results = await dbClient.select().from(schema.enrollments).where(eq(schema.enrollments.id, id));
    return results[0];
  }

  async createEnrollment(enrollment: InsertEnrollment): Promise<Enrollment> {
    const newEnrollment = {
      id: randomUUID(),
      ...enrollment,
      createdAt: new Date(),
    };
    await dbClient.insert(schema.enrollments).values(newEnrollment);
    return newEnrollment;
  }

  async updateEnrollment(id: string, enrollment: Partial<InsertEnrollment>): Promise<Enrollment | undefined> {
    const existingEnrollment = await this.getEnrollment(id);
    
    if (!existingEnrollment) {
      return undefined;
    }
    
    const updatedEnrollment = { ...existingEnrollment, ...enrollment };
    await dbClient.update(schema.enrollments)
      .set(updatedEnrollment)
      .where(eq(schema.enrollments.id, id));
    
    return updatedEnrollment;
  }

  async deleteEnrollment(id: string): Promise<boolean> {
    try {
      await dbClient.delete(schema.enrollments).where(eq(schema.enrollments.id, id));
      return true;
    } catch (error) {
      console.error('Error deleting enrollment:', error);
      return false;
    }
  }

  // Stats methods
  async getStats(): Promise<{
    totalPapers: number;
    totalVideos: number;
    totalUsers: number;
    totalFeedback: number;
    totalNotes: number;
    totalEnrollments: number;
  }> {
    try {
      const [papers, videos, users, feedbackItems, notesItems, enrollmentItems] = await Promise.all([
        dbClient.select({ count: count() }).from(schema.questionPapers),
        dbClient.select({ count: count() }).from(schema.videos),
        dbClient.select({ count: count() }).from(schema.users),
        dbClient.select({ count: count() }).from(schema.feedback),
        dbClient.select({ count: count() }).from(schema.notes),
        dbClient.select({ count: count() }).from(schema.enrollments),
      ]);

      // Handle different possible formats of count result
      const getCount = (result: any) => {
        if (!result || !result[0]) return 0;
        const countValue = result[0].count;
        return typeof countValue === 'number' ? countValue : 
               typeof countValue === 'string' ? parseInt(countValue, 10) : 
               typeof countValue === 'bigint' ? Number(countValue) : 0;
      };

      return {
        totalPapers: getCount(papers),
        totalVideos: getCount(videos),
        totalUsers: getCount(users),
        totalFeedback: getCount(feedbackItems),
        totalNotes: getCount(notesItems),
        totalEnrollments: getCount(enrollmentItems),
      };
    } catch (error) {
      console.error('Error getting stats:', error);
      return {
        totalPapers: 0,
        totalVideos: 0,
        totalUsers: 0,
        totalFeedback: 0,
        totalNotes: 0,
        totalEnrollments: 0,
      };
    }
  }
}