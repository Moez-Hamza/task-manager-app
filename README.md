# Task Manager Application

A full-stack task management application built with Express, TypeScript, Prisma, and Next.js.

## Project Overview

This project consists of two main parts:
- **Backend**: RESTful API built with Express.js, TypeScript, and Prisma ORM with SQLite database
- **Frontend**: Modern web application built with Next.js, TailwindCSS, and NextAuth.js

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory
   ```bash
   cd back-end
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up the database
   ```bash
   npm run setup
   ```

4. Start the development server
   ```bash
   npm run dev
   ```
   The server will run on http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory
   ```bash
   cd task-app-front-end
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```
   The application will be available at http://localhost:3000

## Key Design Decisions

1. **Database Choice**: Used SQLite for local development due to its simplicity and zero-configuration setup. The application is designed to be database-agnostic through Prisma ORM, making it easy to switch to PostgreSQL or other databases in production.

2. **Authentication**: Implemented JWT-based authentication in the backend with NextAuth integration in the frontend for a secure and seamless user experience.

3. **API Design**: Created a clean RESTful API with proper validation using Zod and Express Validator.

4. **Frontend Architecture**: Built a responsive UI with TailwindCSS and utilized Next.js App Router for modern client-side navigation.

5. **Component Structure**: Developed reusable components for tasks to maintain clean, maintainable code.

## Stretch Goals Achieved

1. **Advanced Filtering and Sorting**: Implemented the ability to filter tasks by status and priority, as well as sort by various fields.

2. **Responsive Design**: Created a fully responsive UI that works well on both desktop and mobile devices.

3. **Form Validation**: Added comprehensive form validation throughout the application for better user experience.

4. **Error Handling**: Implemented proper error handling on both frontend and backend.

## Challenges Faced

The hardest part of developing this application was setting up the backend since I hadn't worked with Prisma and Node.js/Express in a while. I encountered some challenges with the database schema design and ensuring proper relationships between models.

I also had some issues with NextAuth since I hadn't worked with it before. I had to rely on documentation, online resources, and AI assistance to implement the authentication flow correctly.

Despite these challenges, everything went smoothly once the initial setup was complete, and I was able to build a functional and user-friendly task management application.

Hope my work will satisfy you and that I will join the Bysur team soon!