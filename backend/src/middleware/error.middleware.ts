import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiError } from '../utils/api-error';

export const notFoundMiddleware = (req: Request, _res: Response, next: NextFunction): void => {
  next(new ApiError(StatusCodes.NOT_FOUND, `Route not found: ${req.originalUrl}`));
};

export const errorMiddleware = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      message: err.message
    });
    return;
  }

  if (err instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message
    });
    return;
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: 'Internal server error'
  });
};
