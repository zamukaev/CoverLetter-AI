import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../utils/api-error";
import { verifyJwt } from "../utils/jwt";

export const requireAuth = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    next(
      new ApiError(
        StatusCodes.UNAUTHORIZED,
        "Missing or invalid authorization header",
      ),
    );
    return;
  }

  try {
    const token = authHeader.split(" ")[1];

    if (!token) {
      next(new ApiError(StatusCodes.UNAUTHORIZED, "Missing bearer token"));
      return;
    }

    req.user = verifyJwt(token);
    next();
  } catch (_error) {
    next(new ApiError(StatusCodes.UNAUTHORIZED, "Invalid or expired token"));
  }
};
