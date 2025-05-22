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

## Project Structure

- `src/app/` - Next.js app router
- `src/app/api/auth/[...nextauth]/` - NextAuth setup
- `src/app/auth/` - Authentication pages (login, register)
- `src/app/dashboard/` - Dashboard and task management
- `src/components/` - Reusable components

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
