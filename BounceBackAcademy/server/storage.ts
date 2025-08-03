import { type Notes, type InsertNote } from "@shared/schema";
import { type User, type InsertUser, type QuestionPaper, type InsertQuestionPaper, type Video, type InsertVideo, type Feedback, type InsertFeedback, type Enrollment, type InsertEnrollment } from "@shared/schema";
import { randomUUID } from "crypto";
import { USE_MEMORY_STORAGE } from "./env";
import { DbStorage } from "./db-storage";

export interface IStorage {
  // User methods
  getUsers(): Promise<User[]>;
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByMobile(mobile: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  deleteUser(id: string): Promise<boolean>;
  
  // Question paper methods
  getQuestionPapers(filters?: { class?: number; subject?: string; year?: number; phase?: string }): Promise<QuestionPaper[]>;
  getQuestionPaper(id: string): Promise<QuestionPaper | undefined>;
  getQuestionPaperById(id: string): Promise<QuestionPaper | undefined>;
  createQuestionPaper(paper: InsertQuestionPaper): Promise<QuestionPaper>;
  updateQuestionPaper(id: string, paper: Partial<InsertQuestionPaper>): Promise<QuestionPaper | undefined>;
  deleteQuestionPaper(id: string): Promise<boolean>;
  
  // Video methods
  getVideos(filters?: { class?: number; subject?: string }): Promise<Video[]>;
  getVideo(id: string): Promise<Video | undefined>;
  createVideo(video: InsertVideo): Promise<Video>;
  updateVideo(id: string, video: Partial<InsertVideo>): Promise<Video | undefined>;
  deleteVideo(id: string): Promise<boolean>;
  
  // Notes methods
  getNotes(filters?: { class?: number; subject?: string }): Promise<Notes[]>;
  getNoteById(id: string): Promise<Notes | undefined>;
  createNote(note: InsertNote): Promise<Notes>;
  updateNote(id: string, note: Partial<InsertNote>): Promise<Notes | undefined>;
  deleteNote(id: string): Promise<boolean>;

  // Feedback methods
  getFeedback(): Promise<Feedback[]>;
  createFeedback(feedback: InsertFeedback): Promise<Feedback>;
  deleteFeedback(id: string): Promise<boolean>;
  
  // Enrollment methods
  getEnrollments(): Promise<Enrollment[]>;
  getEnrollment(id: string): Promise<Enrollment | undefined>;
  createEnrollment(enrollment: InsertEnrollment): Promise<Enrollment>;
  updateEnrollment(id: string, enrollment: Partial<InsertEnrollment>): Promise<Enrollment | undefined>;
  deleteEnrollment(id: string): Promise<boolean>;
  
  // Stats methods
  getStats(): Promise<{
    totalPapers: number;
    totalVideos: number;
    totalUsers: number;
    totalFeedback: number;
    totalNotes: number;
    totalEnrollments: number;
  }>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private questionPapers: Map<string, QuestionPaper>;
  private videos: Map<string, Video>;
  private notes: Map<string, Notes>;
  private feedbackList: Map<string, Feedback>;
  private enrollments: Map<string, Enrollment>;

  constructor() {
    this.users = new Map();
    this.questionPapers = new Map();
    this.videos = new Map();
    this.notes = new Map();
    this.feedbackList = new Map();
    this.enrollments = new Map();
    this.initializeData();
  }

  private initializeData() {
    // Create admin user
    const adminId = randomUUID();
    const admin: User = {
      id: adminId,
      username: "admin",
      password: "admin123", // In real app, this would be hashed
      mobile: "",
      role: "admin"
    };
    this.users.set(adminId, admin);
    
    // Sample enrollments
    const sampleEnrollments: Enrollment[] = [
      {
        id: randomUUID(),
        name: "John Doe",
        class: "10",
        phone: "9876543210",
        whatsapp: "9876543210",
        address: "123 Main St, City",
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        name: "Jane Smith",
        class: "12",
        phone: "8765432109",
        whatsapp: "8765432109",
        address: "456 Park Ave, Town",
        createdAt: new Date()
      }
    ];
    
    sampleEnrollments.forEach(enrollment => {
      this.enrollments.set(enrollment.id, enrollment);
    });

    // Sample question papers
    const samplePapers: QuestionPaper[] = [
      {
        id: randomUUID(),
        title: "Mathematics Phase 1",
        class: 10,
        subject: "Mathematics",
        year: 2024,
        phase: "Phase 1",
        fileUrl: "/papers/math-10-2024-p1.pdf",
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        title: "Science Phase 2",
        class: 10,
        subject: "Science",
        year: 2024,
        phase: "Phase 2",
        fileUrl: "/papers/science-10-2024-p2.pdf",
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        title: "English Board Exam",
        class: 12,
        subject: "English",
        year: 2023,
        phase: "Board Exam",
        fileUrl: "/papers/english-12-2023-board.pdf",
        createdAt: new Date()
      }
    ];

    samplePapers.forEach(paper => {
      this.questionPapers.set(paper.id, paper);
    });

    // Sample videos
    const sampleVideos: Video[] = [
      {
        id: randomUUID(),
        title: "Algebra Basics",
        description: "Introduction to algebraic expressions and equations",
        class: 9,
        subject: "Mathematics",
        youtubeUrl: "https://www.youtube.com/watch?v=NcQUiqpGfXQ",
        thumbnailUrl: "https://img.youtube.com/vi/NcQUiqpGfXQ/maxresdefault.jpg",
        duration: "15",
        views: 1,
        uploadDate: "20/7/2025",
        category: "Mathematics",
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        title: "Photosynthesis Explained",
        description: "Understanding the process of photosynthesis in plants",
        class: 10,
        subject: "Science",
        youtubeUrl: "https://www.youtube.com/watch?v=sQK3Yr4Sc_k",
        thumbnailUrl: "https://img.youtube.com/vi/sQK3Yr4Sc_k/maxresdefault.jpg",
        duration: "12",
        views: 5,
        uploadDate: "21/7/2025",
        category: "Chemistry & Energy",
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        title: "Latest Song",
        description: "Latest Release Song",
        class: 11,
        subject: "Latest Song",
        youtubeUrl: "https://www.youtube.com/watch?v=1PxSMMproEo",
        thumbnailUrl: "https://img.youtube.com/vi/1PxSMMproEo/maxresdefault.jpg",
        duration: "10",
        views: 1,
        uploadDate: "23/7/2025",
        category: "Latest Song",
        createdAt: new Date()
      }
    ];

    sampleVideos.forEach(video => {
      this.videos.set(video.id, video);
    });

    // Sample notes
    const sampleNotes: Notes[] = [
      {
        id: randomUUID(),
        title: "Physics Chapter 1: Mechanics",
        description: "Comprehensive notes on classical mechanics, including Newton's laws and work-energy theorem.",
        class: 11,
        subject: "Physics",
        fileUrl: "/notes/physics-11-mechanics.pdf",
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        title: "Chemistry Chapter 3: Chemical Bonding",
        description: "Detailed notes on ionic, covalent, and metallic bonding, with examples and diagrams.",
        class: 12,
        subject: "Chemistry",
        fileUrl: "/notes/chemistry-12-bonding.pdf",
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        title: "Biology Chapter 5: Cell Biology",
        description: "An in-depth look at cell structure, function, and cellular processes.",
        class: 10,
        subject: "Biology",
        fileUrl: "/notes/biology-10-cell-biology.pdf",
        createdAt: new Date()
      }
    ];

    sampleNotes.forEach(note => {
      this.notes.set(note.id, note);
    });
  }

  async getUsers(): Promise<User[]> {
    return Array.from(this.users.values())
      .map(user => ({
        ...user,
        password: "*****" // Hide password for security
      }))
      .sort((a, b) => a.username.localeCompare(b.username));
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async getUserByMobile(mobile: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.mobile === mobile);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      role: insertUser.role || "user"
    };
    this.users.set(id, user);
    return user;
  }

  async deleteUser(id: string): Promise<boolean> {
    // Don't allow deleting the admin user
    const user = this.users.get(id);
    if (user && user.role === "admin") {
      return false;
    }
    return this.users.delete(id);
  }

  async getQuestionPapers(filters?: { class?: number; subject?: string; year?: number; phase?: string }): Promise<QuestionPaper[]> {
    let papers = Array.from(this.questionPapers.values());
    
    if (filters) {
      if (filters.class) papers = papers.filter(p => p.class === filters.class);
      if (filters.subject) papers = papers.filter(p => p.subject === filters.subject);
      if (filters.year) papers = papers.filter(p => p.year === filters.year);
      if (filters.phase) papers = papers.filter(p => p.phase === filters.phase);
    }
    
    return papers.sort((a, b) => b.year - a.year);
  }

  async getQuestionPaper(id: string): Promise<QuestionPaper | undefined> {
    return this.questionPapers.get(id);
  }

  async getQuestionPaperById(id: string): Promise<QuestionPaper | undefined> {
    return this.questionPapers.get(id);
  }

  async createQuestionPaper(paper: InsertQuestionPaper): Promise<QuestionPaper> {
    const id = randomUUID();
    const newPaper: QuestionPaper = { ...paper, id, createdAt: new Date() };
    this.questionPapers.set(id, newPaper);
    return newPaper;
  }

  async updateQuestionPaper(id: string, paper: Partial<InsertQuestionPaper>): Promise<QuestionPaper | undefined> {
    const existing = this.questionPapers.get(id);
    if (!existing) return undefined;
    
    const updated: QuestionPaper = { ...existing, ...paper };
    this.questionPapers.set(id, updated);
    return updated;
  }

  async deleteQuestionPaper(id: string): Promise<boolean> {
    return this.questionPapers.delete(id);
  }

  async getVideos(filters?: { class?: number; subject?: string }): Promise<Video[]> {
    let videos = Array.from(this.videos.values());
    
    if (filters) {
      if (filters.class) videos = videos.filter(v => v.class === filters.class);
      if (filters.subject) videos = videos.filter(v => v.subject === filters.subject);
    }
    
    return videos.sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime());
  }

  async getNotes(filters?: { class?: number; subject?: string }): Promise<Notes[]> {
    let notes = Array.from(this.notes.values());
    
    if (filters) {
      if (filters.class) notes = notes.filter(n => n.class === filters.class);
      if (filters.subject) notes = notes.filter(n => n.subject === filters.subject);
    }
    
    return notes.sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime());
  }

  async getNoteById(id: string): Promise<Notes | undefined> {
    return this.notes.get(id);
  }

  async createNote(note: InsertNote): Promise<Notes> {
    const id = randomUUID();
    const newNote: Notes = { ...note, id, createdAt: new Date(), description: note.description || null };
    this.notes.set(id, newNote);
    return newNote;
  }

  async updateNote(id: string, note: Partial<InsertNote>): Promise<Notes | undefined> {
    const existing = this.notes.get(id);
    if (!existing) return undefined;
    
    const updated: Notes = { ...existing, ...note };
    this.notes.set(id, updated);
    return updated;
  }

  async deleteNote(id: string): Promise<boolean> {
    return this.notes.delete(id);
  }

  async getVideo(id: string): Promise<Video | undefined> {
    return this.videos.get(id);
  }

  async createVideo(video: InsertVideo): Promise<Video> {
    const id = randomUUID();
    const newVideo: Video = { 
      ...video, 
      id, 
      createdAt: new Date(),
      description: video.description || null,
      thumbnailUrl: video.thumbnailUrl || null,
      duration: video.duration || null,
      views: video.views || null,
      uploadDate: video.uploadDate || null,
      category: video.category || null
    };
    this.videos.set(id, newVideo);
    return newVideo;
  }

  async updateVideo(id: string, video: Partial<InsertVideo>): Promise<Video | undefined> {
    const existing = this.videos.get(id);
    if (!existing) return undefined;
    
    const updated: Video = { ...existing, ...video };
    this.videos.set(id, updated);
    return updated;
  }

  async deleteVideo(id: string): Promise<boolean> {
    return this.videos.delete(id);
  }

  async getFeedback(): Promise<Feedback[]> {
    return Array.from(this.feedbackList.values())
      .sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime());
  }

  async createFeedback(feedback: InsertFeedback): Promise<Feedback> {
    const id = randomUUID();
    const newFeedback: Feedback = { 
      ...feedback, 
      id, 
      createdAt: new Date(),
      email: feedback.email || null,
      rating: feedback.rating || null
    };
    this.feedbackList.set(id, newFeedback);
    return newFeedback;
  }

  async deleteFeedback(id: string): Promise<boolean> {
    return this.feedbackList.delete(id);
  }

  async getStats() {
    return {
      totalPapers: this.questionPapers.size,
      totalVideos: this.videos.size,
      totalUsers: this.users.size,
      totalFeedback: this.feedbackList.size,
      totalNotes: this.notes.size,
      totalEnrollments: this.enrollments.size,
    };
  }

  async getEnrollments(): Promise<Enrollment[]> {
    return Array.from(this.enrollments.values())
      .sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime());
  }

  async getEnrollment(id: string): Promise<Enrollment | undefined> {
    return this.enrollments.get(id);
  }

  async createEnrollment(enrollment: InsertEnrollment): Promise<Enrollment> {
    const id = randomUUID();
    const newEnrollment: Enrollment = { 
      ...enrollment, 
      id, 
      createdAt: new Date() 
    };
    this.enrollments.set(id, newEnrollment);
    return newEnrollment;
  }

  async updateEnrollment(id: string, enrollment: Partial<InsertEnrollment>): Promise<Enrollment | undefined> {
    const existing = this.enrollments.get(id);
    if (!existing) return undefined;
    
    const updated: Enrollment = { ...existing, ...enrollment };
    this.enrollments.set(id, updated);
    return updated;
  }

  async deleteEnrollment(id: string): Promise<boolean> {
    return this.enrollments.delete(id);
  }
}

// Choose storage implementation based on environment variable
let storageImplementation: IStorage;

if (USE_MEMORY_STORAGE) {
  console.log('Using in-memory storage');
  storageImplementation = new MemStorage();
} else {
  try {
    console.log('Using database storage');
    storageImplementation = new DbStorage();
  } catch (error) {
    console.error('Failed to initialize database storage, falling back to in-memory storage', error);
    storageImplementation = new MemStorage();
  }
}

export const storage = storageImplementation;
