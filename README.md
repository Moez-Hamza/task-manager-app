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

## Goals Achieved

1. **Advanced Filtering and Sorting**: Implemented the ability to filter tasks by status and priority, as well as sort by various fields.

2. **Responsive Design**: Created a fully responsive UI that works well on both desktop and mobile devices.

3. **Form Validation**: Added comprehensive form validation throughout the application for better user experience.

4. **Error Handling**: Implemented proper error handling on both frontend and backend.

## Challenges Faced

The hardest part of developing this application was setting up the backend since I hadn't worked with Prisma and Node.js/Express in a while. I encountered some challenges with the database schema design and ensuring proper relationships between models.

I also had some issues with NextAuth since I hadn't worked with it before. I had to rely on documentation, online resources, and AI assistance to implement the authentication flow correctly.

Despite these challenges, everything went smoothly once the initial setup was complete, and I was able to build a functional and user-friendly task management application.

## API Documentation

The backend provides a RESTful API for managing users and tasks. Below is the detailed documentation for all available endpoints.

### Authentication Endpoints

#### Register User
- **URL**: `/api/users/register`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Success Response**: 
  - **Code**: 201 Created
  - **Content**: 
    ```json
    {
      "user": {
        "id": "uuid",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "token": "jwt-token-string"
    }
    ```
- **Error Responses**:
  - **Code**: 400 Bad Request (validation errors)
  - **Code**: 409 Conflict (email already in use)

#### Login User
- **URL**: `/api/users/login`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Success Response**: 
  - **Code**: 200 OK
  - **Content**: 
    ```json
    {
      "user": {
        "id": "uuid",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "token": "jwt-token-string"
    }
    ```
- **Error Responses**:
  - **Code**: 400 Bad Request (validation errors)
  - **Code**: 401 Unauthorized (invalid credentials)

### Task Endpoints

> **Note**: All task endpoints require authentication. Include the JWT token in the Authorization header: `Authorization: Bearer {token}`

#### Create Task
- **URL**: `/api/tasks`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "title": "Complete project",
    "description": "Finish the task manager app",
    "status": "Todo",
    "dueDate": "2025-06-01T00:00:00.000Z",
    "priority": "High"
  }
  ```
- **Success Response**: 
  - **Code**: 201 Created
  - **Content**: Task object
- **Error Responses**:
  - **Code**: 400 Bad Request (validation errors)
  - **Code**: 401 Unauthorized

#### Get All Tasks
- **URL**: `/api/tasks`
- **Method**: `GET`
- **Query Parameters**:
  - `status` (optional): Filter by status (`Todo`, `InProgress`, `Done`)
  - `priority` (optional): Filter by priority (`Low`, `Medium`, `High`)
  - `sortBy` (optional): Field to sort by (e.g., `dueDate`, `createdAt`, `priority`)
  - `order` (optional): Sort order (`asc` or `desc`, default: `desc`)
- **Success Response**: 
  - **Code**: 200 OK
  - **Content**: Array of task objects
- **Error Response**:
  - **Code**: 401 Unauthorized

#### Get Task By ID
- **URL**: `/api/tasks/:id`
- **Method**: `GET`
- **URL Parameters**: `id` - Task ID
- **Success Response**: 
  - **Code**: 200 OK
  - **Content**: Task object
- **Error Responses**:
  - **Code**: 401 Unauthorized
  - **Code**: 403 Forbidden (task belongs to another user)
  - **Code**: 404 Not Found

#### Update Task
- **URL**: `/api/tasks/:id`
- **Method**: `PUT`
- **URL Parameters**: `id` - Task ID
- **Request Body**:
  ```json
  {
    "title": "Updated title",
    "description": "Updated description",
    "status": "InProgress",
    "dueDate": "2025-06-15T00:00:00.000Z",
    "priority": "Medium"
  }
  ```
  > All fields are optional
- **Success Response**: 
  - **Code**: 200 OK
  - **Content**: Updated task object
- **Error Responses**:
  - **Code**: 400 Bad Request (validation errors)
  - **Code**: 401 Unauthorized
  - **Code**: 403 Forbidden (task belongs to another user)
  - **Code**: 404 Not Found

#### Delete Task
- **URL**: `/api/tasks/:id`
- **Method**: `DELETE`
- **URL Parameters**: `id` - Task ID
- **Success Response**: 
  - **Code**: 200 OK
  - **Content**: `{ "message": "Task removed" }`
- **Error Responses**:
  - **Code**: 401 Unauthorized
  - **Code**: 403 Forbidden (task belongs to another user)
  - **Code**: 404 Not Found

## Postman Collection

A Postman collection is available to test the API endpoints. You can find it in the `docs/postman` directory of this repository.

### How to Use the Postman Collection

1. Import the `TaskManager.postman_collection.json` file into Postman
2. Set up an environment variable named `baseUrl` with value `http://localhost:5000`
3. Set up an environment variable named `token` which will be automatically populated after login/register
4. Start with the authentication endpoints to get a valid token
5. All other requests will automatically use the token for authentication

Hope my work will satisfy you and that I will join the Bysur team soon!
