# Task Manager Frontend

This is the frontend for the Task Manager application built with Next.js and TailwindCSS. The application provides user authentication and task management functionality.

## Features

- User authentication (register, login, logout)
- Task management (create, read, update, delete)
- Filter tasks by status and priority
- Sort tasks by different criteria
- Responsive design using TailwindCSS

## Prerequisites

Before running the frontend, make sure the backend server is up and running. The frontend expects the backend to be available at `http://localhost:5000`.

## Getting Started

### 1. Install dependencies

```bash
npm install
# or
yarn install
```

### 2. Start the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### 3. How to use

1. Register a new user account if you don't have one already.
2. Log in with your credentials.
3. Create tasks from the dashboard.
4. Manage your tasks (update status, edit, delete).
5. Use filters and sorting options to organize your tasks.

## Environment Variables

The application uses the following environment variables:

```
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000
```

You can create a `.env.local` file in the project root to set these variables.

## Architecture

The application follows a clean architecture pattern with separation of concerns:

### Type System
The application uses TypeScript with dedicated type definitions:

- **Types**: Centralized type definitions for consistent typing across the application
  - `task.types.ts`: Task-related types (Task, TaskCreateInput, TaskUpdateInput)
  - `auth.types.ts`: Authentication-related types (LoginCredentials, RegisterData)
  - `error.ts`: Error handling types

### Utility Layer
Common functionality is extracted to reusable utility functions:

- **Utils**: Shared functions for formatting, styling, and other helpers
  - `dateUtils.ts`: Date formatting and manipulation utilities
  - `styleUtils.ts`: UI styling helpers with object-based class lookups

### Service Layer
The application implements a service layer pattern to separate API calls from UI components:

- **Services**: Encapsulate all API interactions and data fetching logic
  - `authService.ts`: Handles authentication (login, register) API calls
  - `taskService.ts`: Manages task CRUD operations with the backend

### Component Structure
The UI is organized into reusable components following best practices:

- **Layout Components**: Structure the application (Header, FilterBar)
- **Feature Components**: Implement specific features (TaskForm, TaskList)
- **Form Components**: Handle user input (LoginForm, RegisterForm)

## Project Structure

```
src/
├── app/                        # Next.js app router
│   ├── api/                    # API routes
│   │   └── auth/               # NextAuth API routes
│   ├── auth/                   # Auth pages
│   │   ├── login/             # Login page
│   │   └── register/          # Registration page
│   ├── dashboard/             # Dashboard & task management
│   └── page.tsx               # Home page with redirect
├── components/                 # Reusable components
│   ├── auth/                  # Auth-related components
│   │   ├── LoginForm.tsx     # Login form component
│   │   └── RegisterForm.tsx  # Registration form component
│   ├── Header.tsx            # Navigation header
│   ├── FilterBar.tsx         # Task filtering & sorting
│   ├── TaskForm.tsx          # Task creation/editing form
│   └── TaskList.tsx          # Task list display
├── services/                   # API service layer
│   ├── authService.ts         # Authentication service
│   └── taskService.ts         # Task management service
├── types/                      # TypeScript type definitions
│   ├── auth.types.ts          # Authentication-related types
│   ├── error.ts               # Error handling types
│   ├── next-auth.d.ts         # NextAuth type extensions
│   └── task.types.ts          # Task-related types
└── utils/                      # Utility functions
    ├── dateUtils.ts           # Date formatting utilities
    └── styleUtils.ts          # UI styling helpers
```

## Technologies Used

- Next.js
- TailwindCSS
- NextAuth.js
- Axios
- React Hook Form
- Zod

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
