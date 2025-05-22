import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ApiError } from './error.middleware';


declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      };
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    const error = new Error('Not authorized, no token') as ApiError;
    error.statusCode = 401;
    return next(error);
  }

  try {

    const token = authHeader.split(' ')[1];
    

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_jwt_secret') as {
      id: string;
      email: string;
    };
    

    req.user = decoded;
    
    next();
  } catch (error) {
    const err = new Error('Not authorized, token failed') as ApiError;
    err.statusCode = 401;
    next(err);
  }
};
