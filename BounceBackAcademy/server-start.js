// Simple server starter script
import { spawn } from 'child_process';
import path from 'path';

// Start the server
const server = spawn('npx', ['cross-env', 'NODE_ENV=development', 'PORT=5000', 'tsx', 'server/index.ts'], {
  stdio: 'inherit',
  shell: true
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

console.log('Server process started. Press Ctrl+C to stop.');

// Keep the process running
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  server.kill();
  process.exit(0);
});