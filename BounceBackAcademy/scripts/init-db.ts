import { db, schema } from '../server/db';
import { eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import { USE_MEMORY_STORAGE } from '../server/env';

// Throw an error if db is null and we're not using memory storage
if (!db && !USE_MEMORY_STORAGE) {
  throw new Error('Database client is not initialized and USE_MEMORY_STORAGE is not set to true');
}

// Create a non-null assertion for db to use throughout the script
const dbClient = db!;

async function initializeDatabase() {
  console.log('Initializing database...');

  // Check if admin user exists
  const adminUsers = await dbClient.select()
    .from(schema.users)
    .where(eq(schema.users.username, 'admin'));

  // If admin user doesn't exist, create one
  if (adminUsers.length === 0) {
    console.log('Creating admin user...');
    await dbClient.insert(schema.users).values({
      id: randomUUID(),
      username: 'admin',
      password: 'admin123', // In a real app, this would be hashed
      mobile: '',
      role: 'admin'
    });
    console.log('Admin user created successfully');
  } else {
    console.log('Admin user already exists');
  }

  console.log('Database initialization complete');
}

// Run the initialization function
initializeDatabase()
  .then(() => {
    console.log('Database initialization script completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error initializing database:', error);
    process.exit(1);
  });