import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const validateRequest = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.issues.map((issue) => issue.message).join(', ');
        return res.status(400).json({
          error: 'Validation failed',
          details: errorMessage,
        });
      }
      next(error);
    }
  };
};

export const validateParams = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.params);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.issues.map((issue) => issue.message).join(', ');
        return res.status(400).json({
          error: 'Invalid parameters',
          details: errorMessage,
        });
      }
      next(error);
    }
  };
};
