// Script to check uploads directory structure
import fs from 'fs';
import path from 'path';

const uploadsDir = path.join(process.cwd(), 'uploads');

console.log('Checking uploads directory structure...');

// Check if uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  console.log('Uploads directory does not exist. Creating it...');
  fs.mkdirSync(uploadsDir, { recursive: true });
} else {
  console.log('Uploads directory exists.');
}

// Check papers directory
const papersDir = path.join(uploadsDir, 'papers');
if (!fs.existsSync(papersDir)) {
  console.log('Papers directory does not exist. Creating it...');
  fs.mkdirSync(papersDir, { recursive: true });
} else {
  console.log('Papers directory exists.');
  // List files in papers directory
  const papersFiles = fs.readdirSync(papersDir);
  console.log(`Papers directory contains ${papersFiles.length} files.`);
}

// Check notes directory
const notesDir = path.join(uploadsDir, 'notes');
if (!fs.existsSync(notesDir)) {
  console.log('Notes directory does not exist. Creating it...');
  fs.mkdirSync(notesDir, { recursive: true });
} else {
  console.log('Notes directory exists.');
  // List files in notes directory
  const notesFiles = fs.readdirSync(notesDir);
  console.log(`Notes directory contains ${notesFiles.length} files.`);
}

console.log('Uploads directory structure check complete.');