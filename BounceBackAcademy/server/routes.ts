import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertQuestionPaperSchema, insertVideoSchema, insertFeedbackSchema, insertNoteSchema, insertEnrollmentSchema } from "@shared/schema";
import { uploadPaper, uploadNote } from "./multer";
import path from "path";

// Extend Express Request type to include file from multer
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
      }

      const user = await storage.getUserByUsername(username);
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      res.json({ user: { id: user.id, username: user.username, role: user.role } });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/auth/register", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      const existingUser = await storage.getUserByUsername(validatedData.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      const existingMobile = await storage.getUserByMobile(validatedData.mobile);
      if (existingMobile) {
        return res.status(400).json({ message: "Mobile number already registered" });
      }

      const user = await storage.createUser(validatedData);
      res.json({ user: { id: user.id, username: user.username, role: user.role } });
    } catch (error) {
      res.status(400).json({ message: "Invalid user data" });
    }
  });

  // Question Papers routes
  app.get("/api/question-papers", async (req, res) => {
    try {
      const { class: classNum, subject, year, phase } = req.query;
      const filters: any = {};
      
      if (classNum) filters.class = parseInt(classNum as string);
      if (subject) filters.subject = subject as string;
      if (year) filters.year = parseInt(year as string);
      if (phase) filters.phase = phase as string;

      const papers = await storage.getQuestionPapers(filters);
      res.json(papers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch question papers" });
    }
  });

  app.post("/api/question-papers", uploadPaper.single('file'), async (req: MulterRequest, res) => {
    try {
      console.log('Request body:', req.body);
      console.log('Request file:', req.file);
      
      // If a file was uploaded, add its path to the request body
      if (req.file) {
        req.body.fileUrl = `/uploads/papers/${req.file.filename}`;
        console.log('File URL set to:', req.body.fileUrl);
      } else {
        console.log('No file uploaded');
        return res.status(400).json({ message: "PDF file is required" });
      }
      
      // Convert class and year to numbers
      if (req.body.class) {
        req.body.class = parseInt(req.body.class);
      }
      
      if (req.body.year) {
        req.body.year = parseInt(req.body.year);
      }
      
      console.log('Validating data:', req.body);
      const validatedData = insertQuestionPaperSchema.parse(req.body);
      console.log('Validated data:', validatedData);
      const paper = await storage.createQuestionPaper(validatedData);
      res.json(paper);
    } catch (error) {
      console.error('Error adding question paper:', error);
      res.status(400).json({ message: "Invalid question paper data", error: String(error) });
    }
  });

  app.put("/api/question-papers/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const paper = await storage.updateQuestionPaper(id, updateData);
      
      if (!paper) {
        return res.status(404).json({ message: "Question paper not found" });
      }
      
      res.json(paper);
    } catch (error) {
      res.status(400).json({ message: "Failed to update question paper" });
    }
  });

  app.delete("/api/question-papers/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteQuestionPaper(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Question paper not found" });
      }
      
      res.json({ message: "Question paper deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete question paper" });
    }
  });

  // Videos routes
  app.get("/api/videos", async (req, res) => {
    try {
      const { class: classNum, subject } = req.query;
      const filters: any = {};
      
      if (classNum) filters.class = parseInt(classNum as string);
      if (subject) filters.subject = subject as string;

      const videos = await storage.getVideos(filters);
      res.json(videos);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch videos" });
    }
  });

  app.post("/api/videos", async (req, res) => {
    try {
      const validatedData = insertVideoSchema.parse(req.body);
      const video = await storage.createVideo(validatedData);
      res.json(video);
    } catch (error) {
      res.status(400).json({ message: "Invalid video data" });
    }
  });

  app.put("/api/videos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const video = await storage.updateVideo(id, updateData);
      
      if (!video) {
        return res.status(404).json({ message: "Video not found" });
      }
      
      res.json(video);
    } catch (error) {
      res.status(400).json({ message: "Failed to update video" });
    }
  });

  app.delete("/api/videos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteVideo(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Video not found" });
      }
      
      res.json({ message: "Video deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete video" });
    }
  });

  // Feedback routes
  app.get("/api/feedback", async (req, res) => {
    try {
      const feedback = await storage.getFeedback();
      res.json(feedback);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch feedback" });
    }
  });

  app.post("/api/feedback", async (req, res) => {
    try {
      const validatedData = insertFeedbackSchema.parse(req.body);
      const feedback = await storage.createFeedback(validatedData);
      res.json(feedback);
    } catch (error) {
      res.status(400).json({ message: "Invalid feedback data" });
    }
  });

  app.delete("/api/feedback/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteFeedback(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Feedback not found" });
      }
      
      res.json({ message: "Feedback deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete feedback" });
    }
  });

  // Users routes
  app.get("/api/users", async (req, res) => {
    try {
      const users = await storage.getUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  app.delete("/api/users/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteUser(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete user" });
    }
  });

  // Stats route
  app.get("/api/stats", async (req, res) => {
    try {
      const stats = await storage.getStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  // Enrollments routes
  app.get("/api/enrollments", async (req, res) => {
    try {
      const enrollments = await storage.getEnrollments();
      res.json(enrollments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch enrollments" });
    }
  });

  app.get("/api/enrollments/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const enrollment = await storage.getEnrollment(id);
      
      if (!enrollment) {
        return res.status(404).json({ message: "Enrollment not found" });
      }
      
      res.json(enrollment);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch enrollment" });
    }
  });

  app.post("/api/enrollments", async (req, res) => {
    try {
      const validatedData = insertEnrollmentSchema.parse(req.body);
      const enrollment = await storage.createEnrollment(validatedData);
      res.status(201).json(enrollment);
    } catch (error) {
      res.status(400).json({ message: "Invalid enrollment data" });
    }
  });

  app.delete("/api/enrollments/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteEnrollment(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Enrollment not found" });
      }
      
      res.json({ message: "Enrollment deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete enrollment" });
    }
  });

  // Notes routes
  app.get("/api/notes", async (req, res) => {
    try {
      const { class: classNum, subject } = req.query;
      const filters: any = {};
      
      if (classNum) filters.class = parseInt(classNum as string);
      if (subject) filters.subject = subject as string;

      const notes = await storage.getNotes(filters);
      console.log("Notes data sent to client:", notes); // Add this line for debugging
      res.json(notes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch notes" });
    }
  });

  app.post("/api/notes", uploadNote.single('file'), async (req: MulterRequest, res) => {
    try {
      console.log('Notes request body:', req.body);
      console.log('Notes request file:', req.file);
      
      // If a file was uploaded, add its path to the request body
      if (req.file) {
        req.body.fileUrl = `/uploads/notes/${req.file.filename}`;
        console.log('Notes file URL set to:', req.body.fileUrl);
      } else {
        console.log('No notes file uploaded');
        return res.status(400).json({ message: "PDF file is required" });
      }

      // Convert class to number
      if (req.body.class) {
        req.body.class = parseInt(req.body.class);
      }
      
      console.log('Validating notes data:', req.body);
      const validatedData = insertNoteSchema.parse(req.body);
      console.log('Validated notes data:', validatedData);
      const note = await storage.createNote(validatedData);
      res.json(note);
    } catch (error) {
      console.error('Error adding note:', error);
      res.status(400).json({ message: "Invalid note data", error: String(error) });
    }
  });

  app.put("/api/notes/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const note = await storage.updateNote(id, updateData);
      
      if (!note) {
        return res.status(404).json({ message: "Note not found" });
      }
      
      res.json(note);
    } catch (error) {
      res.status(400).json({ message: "Failed to update note" });
    }
  });

  app.delete("/api/notes/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteNote(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Note not found" });
      }
      
      res.json({ message: "Note deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete note" });
    }
  });

  app.get("/api/notes/download/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const note = await storage.getNoteById(id);

      if (!note) {
        return res.status(404).json({ message: "Note not found" });
      }

      // In a real application, you would handle secure file serving here.
      // For this example, we'll just return the file URL.
      res.json({ fileUrl: note.fileUrl });
    } catch (error) {
      res.status(500).json({ message: "Failed to prepare download" });
    }
  });

  // Question Papers download endpoint
  app.get("/api/question-papers/download/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const paper = await storage.getQuestionPaperById(id);

      if (!paper) {
        return res.status(404).json({ message: "Question paper not found" });
      }

      // Return the file URL for the client to download
      res.json({ fileUrl: paper.fileUrl });
    } catch (error) {
      res.status(500).json({ message: "Failed to prepare download" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
