# Task Manager API

Backend API for the Task Manager application built with Express, TypeScript, Prisma, and SQLite.

## Technologies Used

- Node.js & Express
- TypeScript
- Prisma ORM
- SQLite (local database)
- JWT Authentication
- Zod for validation

> **Note on Database Choice:** Although the original plan was to use PostgreSQL, due to time constraints and installation issues on the development machine, we opted for SQLite for this implementation. The application is designed to be database-agnostic through Prisma ORM, making it easy to switch to PostgreSQL in a production environment by simply changing the database provider in the Prisma schema.

## Setup Instructions

### Prerequisites

- Node.js (v16+)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd task-manager-app/back-end
```

2. Install dependencies:
```bash
npm install
```

3. Environment Variables (Optional):
```bash
# Create a .env file based on the example if you want to customize settings
cp .env.example .env
# The default JWT_SECRET is 'default_jwt_secret' if not specified
```

4. Database Setup:
```bash
# Run the setup script to generate Prisma client and create SQLite database
npm run setup
```

5. Start the development server:
```bash
npm run dev
```

The server will start at http://localhost:5000

## Project Structure

```
back-end/
├── prisma/               # Prisma schema and migrations
├── src/                  # Source code
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── routes/           # API routes
│   ├── utils/            # Utility functions
│   └── index.ts          # Application entry point
├── .env                  # Environment variables (create from .env.example)
├── .env.example          # Example environment variables
├── package.json          # Dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

## API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login a user


### Task Management
- `POST /api/tasks` - Create a new task (requires token)
- `GET /api/tasks` - Get all tasks (requires token)
  - Query params: `status`, `priority`, `sortBy`, `order`
- `GET /api/tasks/:id` - Get a task by ID (requires token)
- `PUT /api/tasks/:id` - Update a task (requires token)
- `DELETE /api/tasks/:id` - Delete a task (requires token)

## Available Scripts

- `npm run dev` - Run the development server with hot-reload
- `npm run build` - Build the TypeScript project
- `npm start` - Start the production server
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio for database visualization
- `npm run setup` - Full setup: generate client and run migrations

## Daily Development Workflow

### Starting Development

When coming back to continue development:

```bash
# Start the development server
npm run dev
```

### After Changing Prisma Schema

If you modify the database schema in `prisma/schema.prisma`:

```bash
# Regenerate client and update database
npx prisma migrate dev --name describe_your_changes
```

### View and Edit Database

To open a GUI for viewing and editing the database:

```bash
npx prisma studio
```
