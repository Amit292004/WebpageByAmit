// Direct server script for production
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Express app
const app = express();

// Serve static files from the dist/public directory
app.use(express.static(path.join(__dirname, 'dist/public')));

// Handle API routes by serving the index.html file
app.get('/api/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/public/index.html'));
});

// Handle all other routes by serving the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/public/index.html'));
});

// Start the server
const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';
app.listen(PORT, HOST, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`);
  console.log(`Access locally via: http://localhost:${PORT}`);
  console.log(`For other devices on your network, use your computer's IP address`);
  console.log('Press Ctrl+C to stop');
});