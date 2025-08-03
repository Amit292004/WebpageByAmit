// Production server starter script
import { spawn } from 'child_process';
import http from 'http';

// Start the server
const server = spawn('node', ['dist/index.js'], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, NODE_ENV: 'production', PORT: '5000' }
});

// Handle server events
server.on('error', (err) => {
  console.error('Failed to start server:', err);
});

server.on('exit', (code) => {
  if (code !== 0) {
    console.error(`Server process exited with code ${code}`);
  }
});

console.log('Production server process started. Press Ctrl+C to stop.');

// Create a simple HTTP server to keep the process running
const keepAliveServer = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('BounceBackAcademy server is running');
});

// Listen on port 5000
keepAliveServer.listen(5000, () => {
  console.log('Server is running at http://localhost:5000');
});

// Keep the process running
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  server.kill();
  process.exit(0);
});