# Next.js Boilerplate

This is a Next.js project bootstrapped with [`create-next-app`](https://nextjs.org/docs/getting-started/installation).

## Technology Stack

- **Node.js**: v22
- **Next.js**: v15
- **React**: v19
- **TypeScript**: Latest
- **Tailwind CSS**: Latest
- **PostgreSQL**: Database
- **Winston**: Logging
- **Playwright**: Testing
- **date-fns**: Date utility library
- **commitizen**: Standardized commit messages
- **husky**: Git hooks
- **lint-staged**: Run linters on staged files
- **next-intl**: Internationalization

## Getting Started

First, ensure you have Node.js v22 installed. You can use nvm to switch to the correct version:

```bash
# If you have nvm installed
nvm use
```

Then, install the dependencies:

```bash
npm install
```

### Database Setup

1. Make sure PostgreSQL is installed and running on your system.

2. Create a `.env` file in the root directory with the following variables (you can copy from `.env.example`):

   ```
   PGHOST=localhost
   PGPORT=5432
   PGDATABASE=nextjs_boilerplate_dev
   PGUSER=postgres
   PGPASSWORD=postgres
   ```

3. Create a PostgreSQL database:

   ```bash
   createdb nextjs_boilerplate_dev
   ```

4. Run the migrations:
   ```bash
   npm run db:migrate:up
   ```

### Running the Application

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

This project uses the Next.js App Router and follows the recommended project structure:

- `src/app`: Contains the application routes and pages
- `src/components`: Reusable UI components
- `src/lib`: Utility functions and shared code
  - `src/lib/db`: PostgreSQL database integration
  - `src/lib/logger.ts`: Winston logger configuration
- `public`: Static assets like images and fonts
- `migrations`: Database migration files
- `tests`: Playwright test files
  - `tests/unit`: Unit tests
  - `tests/api`: API tests
  - `tests/e2e`: End-to-end tests

## Features

### Database Integration

The project uses PostgreSQL for data storage. The database integration is in the `src/lib/db` directory. See the [Database README](src/lib/db/README.md) for more details.

### Logging

The project uses Winston for logging. The logger configuration is in `src/lib/logger.ts`.

### Testing

The project uses Playwright for testing. The test files are in the `tests` directory.

### Date Utilities

The project uses date-fns for date manipulation and formatting. The date utility functions are in `src/lib/utils/date.ts`. See the [Date Utilities README](src/lib/utils/README-date.md) for more details.

### Internationalization

The project uses next-intl for internationalization. The internationalization configuration is in `src/lib/i18n.ts`. Translation files are in the `src/messages` directory.

### Git Workflow

The project uses several tools to improve the Git workflow:

- **commitizen**: Standardized commit messages following the Conventional Commits format
- **husky**: Git hooks to run scripts before commits, pushes, etc.
- **lint-staged**: Run linters only on staged files

## Available Scripts

- `npm run dev`: Run the development server
- `npm run build`: Build the application
- `npm run start`: Start the production server
- `npm run lint`: Lint the code
- `npm run format`: Format the code
- `npm run test`: Run all tests
- `npm run test:unit`: Run unit tests
- `npm run test:api`: Run API tests
- `npm run test:e2e`: Run end-to-end tests
- `npm run db:migrate:up`: Run database migrations
- `npm run db:migrate:down`: Undo database migrations
- `npm run db:migrate:create`: Create a new migration
- `npm run db:reset`: Reset the database
- `npm run commit`: Create a standardized commit message using commitizen
