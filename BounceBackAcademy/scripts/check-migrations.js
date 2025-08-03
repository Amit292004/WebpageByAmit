// Script to check database migrations status
import { config } from 'dotenv';
import { resolve } from 'path';
import postgres from 'postgres';

// Load environment variables from .env file
config({ path: resolve(process.cwd(), '.env') });

// Get environment variables
const DATABASE_URL = process.env.DATABASE_URL || process.env.NETLIFY_DATABASE_URL;

if (!DATABASE_URL) {
  console.error('No DATABASE_URL provided');
  process.exit(1);
}

console.log('Checking database migrations status...');
const client = postgres(DATABASE_URL);

async function checkMigrations() {
  try {
    // Check if the _drizzle_migrations table exists
    const migrationTableExists = await client`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = '_drizzle_migrations'
      );
    `;
    
    console.log('Migration table exists:', migrationTableExists[0].exists);
    
    if (migrationTableExists[0].exists) {
      // Get the list of applied migrations
      const migrations = await client`SELECT * FROM _drizzle_migrations ORDER BY created_at;`;
      console.log('Applied migrations:', migrations.length);
      migrations.forEach((migration, index) => {
        console.log(`${index + 1}. ${migration.migration_name} (${migration.created_at})`);
      });
    }
    
    // Check if the required tables exist
    const tables = ['users', 'question_papers', 'videos', 'notes', 'feedback', 'enrollments'];
    for (const table of tables) {
      const tableExists = await client`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = ${table}
        );
      `;
      console.log(`Table '${table}' exists:`, tableExists[0].exists);
      
      if (tableExists[0].exists) {
        // Count records in the table
        const count = await client`SELECT COUNT(*) FROM ${client(table)};`;
        console.log(`Table '${table}' has ${count[0].count} records`);
      }
    }
  } catch (error) {
    console.error('Error checking migrations:', error.message);
  } finally {
    // Close the connection
    await client.end();
  }
}

checkMigrations();