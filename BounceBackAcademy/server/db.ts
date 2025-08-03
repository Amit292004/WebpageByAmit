import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../shared/schema';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env file
config({ path: resolve(process.cwd(), '.env') });

// Get the database URL from environment variables
const DATABASE_URL = process.env.DATABASE_URL;
const USE_MEMORY_STORAGE = process.env.USE_MEMORY_STORAGE === 'true';

// Check if DATABASE_URL is defined when not using memory storage
if (!USE_MEMORY_STORAGE && !DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not defined and USE_MEMORY_STORAGE is not set to true');
}

// Create a postgres client with the connection string
const client = DATABASE_URL ? postgres(DATABASE_URL) : null;
// Create a drizzle client with the postgres client and schema
export const db = client ? drizzle(client) : null;

// Export the schema for use in other files
export { schema };