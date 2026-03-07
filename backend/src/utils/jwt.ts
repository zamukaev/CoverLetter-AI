import jwt from "jsonwebtoken";
import { env } from "../config/env";
import type { JwtPayload } from "../modules/auth/types/auth.types";

export const signJwt = (payload: JwtPayload): string => {
  const expiresIn = env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"];
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn });
};

export const verifyJwt = (token: string): JwtPayload => {
  return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
};
