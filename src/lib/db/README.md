# PostgreSQL Database Integration

This directory contains the PostgreSQL database integration for the application.

## Setup

1. Install the required packages:
   ```bash
   npm install pg cross-env node-pg-migrate @types/pg --save
   ```

2. Create a `.env` file in the root directory with the following variables (you can copy from `.env.example`):
   ```
   PGHOST=localhost
   PGPORT=5432
   PGDATABASE=icai_udin_dev
   PGUSER=postgres
   PGPASSWORD=postgres
   ```

3. Create a PostgreSQL database:
   ```bash
   createdb icai_udin_dev
   ```

4. Run the migrations:
   ```bash
   npm run db:migrate:up
   ```

## Directory Structure

- `config.ts`: Database connection configuration
- `utils.ts`: Utility functions for database operations
- `models/`: Data models for interacting with database tables
  - `base.model.ts`: Base model class with common functionality
  - `user.model.ts`: User model for interacting with the users table
  - `index.ts`: Exports all models

## Usage

### Database Configuration

The database configuration is in `config.ts`. It supports different environments (development, test, production) and provides functions for executing queries and transactions.

```typescript
import { query, transaction, pool } from '@/lib/db';

// Execute a query
const users = await query('SELECT * FROM users');

// Execute a transaction
await transaction(async (client) => {
  await client.query('INSERT INTO users (name) VALUES ($1)', ['John']);
  await client.query('INSERT INTO users (name) VALUES ($1)', ['Jane']);
});
```

### Database Utilities

The database utilities are in `utils.ts`. They provide higher-level functions for executing queries and transactions with logging and error handling.

```typescript
import { executeQuery, executeTransaction } from '@/lib/db';

// Execute a query with logging
const users = await executeQuery('SELECT * FROM users');

// Execute a transaction with logging
await executeTransaction(async (client) => {
  await client.query('INSERT INTO users (name) VALUES ($1)', ['John']);
  await client.query('INSERT INTO users (name) VALUES ($1)', ['Jane']);
});
```

### Models

Models provide a structured way to interact with database tables. They extend the `BaseModel` class, which provides common functionality like CRUD operations.

```typescript
import { userModel } from '@/lib/db/models';

// Find all users
const users = await userModel.findAll();

// Find a user by ID
const user = await userModel.findById('123');

// Create a user
const newUser = await userModel.createUser({
  email: 'john@example.com',
  name: 'John Doe',
  password_hash: 'hashed_password',
  role: 'user'
});

// Update a user
const updatedUser = await userModel.updateProfile('123', {
  name: 'John Smith'
});

// Delete a user
const deleted = await userModel.deleteUser('123');
```

## Migrations

Migrations are managed using `node-pg-migrate`. The migration files are in the `migrations/` directory.

### Creating a Migration

```bash
npm run db:migrate:create -- my_migration_name
```

### Running Migrations

```bash
# Run all pending migrations
npm run db:migrate:up

# Run a specific number of migrations
npm run db:migrate:up -- --count=1

# Undo the last migration
npm run db:migrate:down

# Undo a specific number of migrations
npm run db:migrate:down -- --count=2

# Reset the database (undo all migrations and run them again)
npm run db:reset
```

## API Integration

The database is integrated with the API routes in `src/app/api/`. For example, the users API routes use the `userModel` to interact with the database.

```typescript
import { userModel } from '@/lib/db/models';

// API route handler
export async function GET(request: NextRequest) {
  const users = await userModel.findAll();
  return NextResponse.json(users);
}
