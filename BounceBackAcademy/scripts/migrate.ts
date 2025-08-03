import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { schema } from '../server/db';
import { resolve } from 'path';
import { USE_MEMORY_STORAGE } from '../server/env';
import { config } from 'dotenv';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';

// Load environment variables from .env file
config({ path: resolve(process.cwd(), '.env') });

// Get the database URL from environment variables
const DATABASE_URL = process.env.DATABASE_URL;

// Check if DATABASE_URL is defined when not using memory storage
if (!USE_MEMORY_STORAGE && !DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not defined and USE_MEMORY_STORAGE is not set to true');
}

// Skip migrations if using memory storage
if (USE_MEMORY_STORAGE) {
  console.log('Using memory storage, skipping migrations');
  process.exit(0);
}

async function runMigrations() {
  console.log('Running migrations...');
  
  try {
    // Create a postgres client for migrations
    const migrationClient = postgres(DATABASE_URL!);
    
    // Create a drizzle client with the postgres client
    const db = drizzle(migrationClient);
    
    // The migrate function will run all migrations in the specified directory
    await migrate(db, { migrationsFolder: resolve('./migrations') });
    
    console.log('Migrations completed successfully');
    
    // Close the client connection
    await migrationClient.end();
  } catch (error) {
    console.error('Error running migrations:', error);
    process.exit(1);
  }
}

runMigrations()
  .then(() => {
    console.log('Migration script completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Unexpected error in migration script:', error);
    process.exit(1);
  });