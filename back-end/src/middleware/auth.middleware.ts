import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ApiError } from './error.middleware';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  try {
    const token = authHeader?.split(' ')[1];
    const decoded = jwt.verify(token!, process.env.JWT_SECRET || 'default_jwt_secret') as {
      id: string;
      email: string;
    };
    req.user = decoded;
    next();
  } catch (error) {
    const err = new Error('Not authorized') as ApiError;
    err.statusCode = 401;
    next(err);
  }
};
