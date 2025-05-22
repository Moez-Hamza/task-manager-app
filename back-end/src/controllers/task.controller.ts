import { Request, Response, NextFunction } from 'express';
import prisma from '../config/db';
import { ApiError } from '../middleware/error.middleware';
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
    const { title, description, status, dueDate, priority } = validatedData;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        status: status || 'Todo',
        dueDate: new Date(dueDate),
        priority: priority || 'Medium',
        userId,
      },
    });

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

    const whereCondition: any = { userId };
    
    if (status) {
      whereCondition.status = status;
    }
    
    if (priority) {
      whereCondition.priority = priority;
    }

    let orderBy: any = {};
    if (sortBy) {
      orderBy[sortBy as string] = order === 'desc' ? 'desc' : 'asc';
    } else {
      orderBy = { createdAt: 'desc' };
    }

    const tasks = await prisma.task.findMany({
      where: whereCondition,
      orderBy,
    });

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

    const task = await prisma.task.findUnique({
      where: { id },
    });

    if (!task || task.userId !== userId) {
      const error = new Error('Task not found') as ApiError;
      error.statusCode = 404;
      throw error;
    }

    res.json(task);
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

    const existingTask = await prisma.task.findUnique({
      where: { id },
    });

    if (!existingTask || existingTask.userId !== userId) {
      const error = new Error('Task not found') as ApiError;
      error.statusCode = 404;
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
    
    const updateData: any = {};
    if (validatedData.title) updateData.title = validatedData.title;
    if (validatedData.description !== undefined) updateData.description = validatedData.description;
    if (validatedData.status) updateData.status = validatedData.status;
    if (validatedData.dueDate) updateData.dueDate = new Date(validatedData.dueDate);
    if (validatedData.priority) updateData.priority = validatedData.priority;

    const task = await prisma.task.update({
      where: { id },
      data: updateData,
    });

    res.json(task);
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

    const existingTask = await prisma.task.findUnique({
      where: { id },
    });

    if (!existingTask || existingTask.userId !== userId) {
      const error = new Error('Task not found') as ApiError;
      error.statusCode = 404;
      throw error;
    }

    await prisma.task.delete({
      where: { id },
    });

    res.json({ message: 'Task removed' });
  } catch (error) {
    next(error);
  }
};
