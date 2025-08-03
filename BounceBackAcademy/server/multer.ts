// @ts-ignore
import multer from 'multer';
// @ts-ignore
import path from 'path';
import * as fs from 'fs';
import { randomUUID } from 'crypto';
import { Request } from 'express';

// Ensure upload directories exist
const paperUploadDir = path.join(process.cwd(), 'uploads', 'papers');
const notesUploadDir = path.join(process.cwd(), 'uploads', 'notes');

// Create directories if they don't exist
if (!fs.existsSync(paperUploadDir)) {
  fs.mkdirSync(paperUploadDir, { recursive: true });
}

if (!fs.existsSync(notesUploadDir)) {
  fs.mkdirSync(notesUploadDir, { recursive: true });
}

// Configure storage for question papers
const paperStorage = multer.diskStorage({
  destination: function(req: any, file: any, cb: any) {
    cb(null, paperUploadDir);
  },
  filename: function(req: any, file: any, cb: any) {
    const uniqueFilename = `${randomUUID()}${path.extname(file.originalname)}`;
    cb(null, uniqueFilename);
  },
});

// Configure storage for notes
const notesStorage = multer.diskStorage({
  destination: function(req: any, file: any, cb: any) {
    cb(null, notesUploadDir);
  },
  filename: function(req: any, file: any, cb: any) {
    const uniqueFilename = `${randomUUID()}${path.extname(file.originalname)}`;
    cb(null, uniqueFilename);
  },
});

// File filter to only allow PDFs
const fileFilter = function(req: any, file: any, cb: any) {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'));
  }
};

// Create multer instances
export const uploadPaper = multer({
  storage: paperStorage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

export const uploadNote = multer({
  storage: notesStorage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});