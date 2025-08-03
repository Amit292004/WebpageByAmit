import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env file
config({ path: resolve(process.cwd(), '.env') });

// Export environment variables
export const DATABASE_URL = process.env.DATABASE_URL;
export const USE_MEMORY_STORAGE = process.env.USE_MEMORY_STORAGE === 'true';
export const PORT = process.env.PORT || '5000';
export const NODE_ENV = process.env.NODE_ENV || 'development';