import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../middleware/error.middleware';
import { TaskService } from '../services/task.service';
import { z } from 'zod';

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  status: z.enum(['Todo', 'InProgress', 'Done']).optional(),
  dueDate: z.string().datetime({ offset: true }),
  priority: z.enum(['Low', 'Medium', 'High']).optional(),
});

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      const error = new Error('User not authenticated') as ApiError;
      error.statusCode = 401;
      throw error;
    }

  
    const validatedData = taskSchema.parse(req.body);
    
    const task = await TaskService.createTask(userId, validatedData);

   
    res.status(201).json(task);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const apiError = new Error(error.errors[0].message) as ApiError;
      apiError.statusCode = 400;
      return next(apiError);
    }
    next(error);
  }
};

export const getTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      const error = new Error('User not authenticated') as ApiError;
      error.statusCode = 401;
      throw error;
    }

    const { status, priority, sortBy, order } = req.query;

    // Create a filters object that matches TaskService.getTasks parameter structure
    const filters = {
      status: status as 'Todo' | 'InProgress' | 'Done' | undefined,
      priority: priority as 'Low' | 'Medium' | 'High' | undefined,
      sortBy: sortBy as string | undefined,
      order: order === 'desc' ? 'desc' : 'asc' as 'asc' | 'desc'
    };

    const tasks = await TaskService.getTasks(userId, filters);

    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

export const getTaskById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      const error = new Error('User not authenticated') as ApiError;
      error.statusCode = 401;
      throw error;
    }

    try {
      const task = await TaskService.getTaskById(id, userId);
      res.json(task);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Task not found';
      const error = new Error(errorMessage) as ApiError;
      error.statusCode = errorMessage.includes('not found') ? 404 : 403;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      const error = new Error('User not authenticated') as ApiError;
      error.statusCode = 401;
      throw error;
    }
    
    const updateTaskSchema = z.object({
      title: z.string().min(1).optional(),
      description: z.string().optional().nullable(),
      status: z.enum(['Todo', 'InProgress', 'Done']).optional(),
      dueDate: z.string().datetime({ offset: true }).optional(),
      priority: z.enum(['Low', 'Medium', 'High']).optional(),
    });

    const validatedData = updateTaskSchema.parse(req.body);
    
    try {
      const task = await TaskService.updateTask(id, userId, validatedData);
      res.json(task);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Task not found';
      const error = new Error(errorMessage) as ApiError;
      error.statusCode = errorMessage.includes('not found') ? 404 : 403;
      throw error;
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const apiError = new Error(error.errors[0].message) as ApiError;
      apiError.statusCode = 400;
      return next(apiError);
    }
    next(error);
  }
};

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      const error = new Error('User not authenticated') as ApiError;
      error.statusCode = 401;
      throw error;
    }

    try {
      await TaskService.deleteTask(id, userId);
      res.json({ message: 'Task removed' });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Task not found';
      const error = new Error(errorMessage) as ApiError;
      error.statusCode = errorMessage.includes('not found') ? 404 : 403;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};
