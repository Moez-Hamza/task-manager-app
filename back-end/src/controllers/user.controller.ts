import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import prisma from '../config/db';
import { generateToken } from '../utils/jwt.utils';
import { ApiError } from '../middleware/error.middleware';
import { z } from 'zod';

const registerSchema = z.object({
  name: z.string().min(2, 'Name should be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password should be at least 6 characters'),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string(),
});

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = registerSchema.parse(req.body);
    
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      const error = new Error('User already exists') as ApiError;
      error.statusCode = 400;
      throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const token = generateToken(user.id, user.email);

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const apiError = new Error(error.errors[0].message) as ApiError;
      apiError.statusCode = 400;
      return next(apiError);
    }
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      const error = new Error('Invalid credentials') as ApiError;
      error.statusCode = 401;
      throw error;
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      const error = new Error('Invalid credentials') as ApiError;
      error.statusCode = 401;
      throw error;
    }

    const token = generateToken(user.id, user.email);

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const apiError = new Error(error.errors[0].message) as ApiError;
      apiError.statusCode = 400;
      return next(apiError);
    }
    next(error);
  }
};
