# Database Setup Guide

## Prerequisites

- PostgreSQL installed and running on your machine
- Node.js and npm installed

## Configuration

1. Create a PostgreSQL database for the application
2. Update the `.env` file with your database connection string:

```
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
```

3. Set `USE_MEMORY_STORAGE=false` in the `.env` file to use the database instead of in-memory storage

## Running Database Migrations

To set up the database schema, run:

```bash
npm run db:push
```

This will create all the necessary tables in your database based on the schema defined in `shared/schema.ts`.

## Initializing the Database

To initialize the database with an admin user, run:

```bash
npm run db:init
```

This will create an admin user with the following credentials:
- Username: `admin`
- Password: `admin123`

## Complete Setup

For a complete database setup (migrations + initialization), run:

```bash
npm run db:setup
```

## Database Schema

The application uses the following tables:

- `users` - User accounts and authentication
- `question_papers` - Question papers uploaded to the system
- `videos` - Educational videos
- `notes` - User notes
- `feedback` - User feedback
- `enrollments` - User enrollments in courses

## Development with In-Memory Storage

For development purposes, you can use in-memory storage instead of a database by setting `USE_MEMORY_STORAGE=true` in the `.env` file. This is useful for quick testing and development without needing a database.

## Troubleshooting

### Connection Issues

If you encounter connection issues, check that:

1. PostgreSQL is running
2. The connection string in `.env` is correct
3. The database exists
4. The user has appropriate permissions

### Migration Issues

If migrations fail, try:

1. Checking the error message for specific issues
2. Ensuring your PostgreSQL version is compatible (9.6 or higher recommended)
3. Running `npm run db:generate` to regenerate migration files