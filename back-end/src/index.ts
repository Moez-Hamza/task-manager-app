import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes';
import taskRoutes from './routes/task.routes';
import { errorHandler } from './middleware/error.middleware';
import { connectDB } from './config/db';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('Task Management API is running');
});

// Error handling middleware
app.use(errorHandler);

// Connect to database and start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to start server:', error);
  });

export default app;
