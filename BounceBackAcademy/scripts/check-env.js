// Script to check environment variables and database connection
import { config } from 'dotenv';
import { resolve } from 'path';
import postgres from 'postgres';

// Load environment variables from .env file
config({ path: resolve(process.cwd(), '.env') });

// Get environment variables
const DATABASE_URL = process.env.DATABASE_URL;
const NETLIFY_DATABASE_URL = process.env.NETLIFY_DATABASE_URL;
const NODE_ENV = process.env.NODE_ENV;
const USE_MEMORY_STORAGE = process.env.USE_MEMORY_STORAGE;

console.log('Environment Variables:');
console.log('NODE_ENV:', NODE_ENV);
console.log('USE_MEMORY_STORAGE:', USE_MEMORY_STORAGE);
console.log('DATABASE_URL exists:', !!DATABASE_URL);
console.log('NETLIFY_DATABASE_URL exists:', !!NETLIFY_DATABASE_URL);

// Test database connection if DATABASE_URL exists
const connectionUrl = DATABASE_URL || NETLIFY_DATABASE_URL;
if (connectionUrl) {
  console.log('Testing database connection...');
  console.log('Using connection URL:', connectionUrl.substring(0, 20) + '...');
  const client = postgres(connectionUrl);
  
  async function testConnection() {
    try {
      // Try a simple query
      const result = await client`SELECT 1 as test`;
      console.log('Database connection successful:', result[0]);
    } catch (error) {
      console.error('Database connection error:', error.message);
    } finally {
      // Close the connection
      await client.end();
    }
  }
  
  testConnection();
} else {
  console.log('No DATABASE_URL provided, skipping connection test');
}