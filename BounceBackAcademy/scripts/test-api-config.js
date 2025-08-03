// Test script to verify API configuration
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read the api-config.ts file directly
const apiConfigPath = join(__dirname, '../client/src/lib/api-config.ts');
const apiConfigContent = fs.readFileSync(apiConfigPath, 'utf8');

console.log('API Configuration File Content:');
console.log('-----------------------');
console.log(apiConfigContent);

console.log('\nVerifying API Configuration:');
console.log('-----------------------');

// Simple implementation of the functions to test
function getApiBaseUrl() {
  // Check if we're in a Netlify production environment
  const isNetlify = process.env.NETLIFY === 'true';
  
  if (isNetlify) {
    return '/.netlify/functions/api';
  }
  
  // For local development
  return '';
}

function getApiUrl(url) {
  // If the URL already includes the base, return it as is
  if (url.includes('/.netlify/functions/api')) {
    return url;
  }
  
  // If it's a relative API URL, add the base
  if (url.startsWith('/api/')) {
    return `${getApiBaseUrl()}${url.substring(4)}`;
  }
  
  // Otherwise, return the URL as is
  return url;
}

function getUploadsUrl(url) {
  // If we're in Netlify, route uploads through the API function
  const isNetlify = process.env.NETLIFY === 'true';
  
  if (isNetlify && url.startsWith('/uploads/')) {
    return `${getApiBaseUrl()}/uploads${url.substring(8)}`;
  }
  
  // Otherwise, return the URL as is
  return url;
}

// Test the functions
console.log('Local environment:');
console.log('API Base URL:', getApiBaseUrl());
console.log('API URL for /api/videos:', getApiUrl('/api/videos'));
console.log('Uploads URL for /uploads/papers/test.pdf:', getUploadsUrl('/uploads/papers/test.pdf'));

// Simulate Netlify environment
process.env.NETLIFY = 'true';

console.log('\nNetlify environment:');
console.log('API Base URL:', getApiBaseUrl());
console.log('API URL for /api/videos:', getApiUrl('/api/videos'));
console.log('Uploads URL for /uploads/papers/test.pdf:', getUploadsUrl('/uploads/papers/test.pdf'));