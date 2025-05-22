import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../middleware/error.middleware';
import { UserService } from '../services/user.service';
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
    

    const result = await UserService.register({ name, email, password });

    res.status(201).json(result);
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

    const result = await UserService.login({ email, password });
  
    res.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const apiError = new Error(error.errors[0].message) as ApiError;
      apiError.statusCode = 400;
      return next(apiError);
    }
    next(error);
  }
};
