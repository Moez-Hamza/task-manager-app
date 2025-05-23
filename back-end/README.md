# Task Manager API

Backend API for the Task Manager application built with Express, TypeScript, and Prisma ORM.

## Technologies Used

- **Framework**: Node.js & Express
- **Language**: TypeScript
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Zod schema validation
- **Error Handling**: Custom middleware
- **Architecture**: MVC pattern with Service layer
- **Type Safety**: Comprehensive TypeScript type system with explicit return types

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

## Architecture

The application follows a layered architecture pattern:

1. **Controllers Layer**: Handles HTTP requests/responses and input validation
2. **Service Layer**: Contains business logic and orchestrates operations
3. **Model Layer**: Handles data access through Prisma ORM
4. **Middleware Layer**: Manages cross-cutting concerns like authentication and error handling

## Project Structure

```
back-end/
├── prisma/                  # Prisma schema and migrations
│   ├── schema.prisma        # Database schema definition
│   └── migrations/          # Database migrations
├── src/                     # Source code
│   ├── controllers/         # Route controllers (HTTP layer)
│   │   ├── task.controller.ts
│   │   └── user.controller.ts
│   ├── middleware/          # Custom middleware
│   │   ├── auth.middleware.ts
│   │   └── error.middleware.ts
│   ├── models/              # Data access layer
│   │   ├── task.model.ts
│   │   └── user.model.ts
│   ├── services/            # Business logic layer
│   │   ├── task.service.ts
│   │   └── user.service.ts
│   ├── routes/              # API routes definitions
│   │   ├── task.routes.ts
│   │   └── user.routes.ts
│   ├── types/               # TypeScript type definitions
│   │   ├── task.types.ts    # Task-related type definitions
│   │   └── express.d.ts     # Express request extension
│   ├── utils/               # Utility functions
│   │   └── jwt.utils.ts
│   └── index.ts             # Application entry point
├── .env                     # Environment variables
├── .env.example             # Example environment variables
├── package.json             # Dependencies and scripts
└── tsconfig.json            # TypeScript configuration
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

## TypeScript Type System

The application follows TypeScript best practices for type safety:

- **Explicit Return Types**: All functions have explicit return types, including Promise types for async functions
- **Custom Type Definitions**: Located in the `/src/types` directory
  - `Task` type for consistent task representation across the application
  - `TaskStatus` and `TaskPriority` enums for type-safe status and priority values
  - `TaskCreateInput` and `TaskUpdateInput` interfaces for type-safe API inputs
- **Interface Extensions**: Express `Request` interface is extended in `express.d.ts` to support the `user` property
- **Zod Validation**: Uses Zod's `nativeEnum` for type-safe validation of enums

This approach ensures compile-time type checking, improves code maintainability, and reduces runtime errors.
