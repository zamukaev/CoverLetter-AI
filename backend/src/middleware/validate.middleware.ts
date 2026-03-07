import type { NextFunction, Request, Response } from 'express';
import type { ZodSchema } from 'zod';
import { StatusCodes } from 'http-status-codes';

export const validateBody = <T>(schema: ZodSchema<T>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const parsed = schema.safeParse(req.body);

    if (!parsed.success) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Validation failed',
        errors: parsed.error.flatten().fieldErrors
      });
      return;
    }

    req.body = parsed.data;
    next();
  };
};
