import { StatusCodes } from 'http-status-codes';
import { prisma } from '../config/prisma';
import { ApiError } from '../utils/api-error';
import { comparePassword, hashPassword } from '../utils/hash';
import { signJwt } from '../utils/jwt';
import type { LoginInput, RegisterInput } from '../modules/auth/dto/auth.dto';
import type { AuthResponse } from '../modules/auth/types/auth.types';

const userSelect = {
  id: true,
  name: true,
  email: true,
  createdAt: true
};

export class AuthService {
  async register(input: RegisterInput): Promise<AuthResponse> {
    const existingUser = await prisma.user.findUnique({ where: { email: input.email } });

    if (existingUser) {
      throw new ApiError(StatusCodes.CONFLICT, 'Email already in use');
    }

    const password = await hashPassword(input.password);

    const user = await prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        password
      },
      select: userSelect
    });

    const token = signJwt({ userId: user.id, email: user.email });

    return { token, user };
  }

  async login(input: LoginInput): Promise<AuthResponse> {
    const user = await prisma.user.findUnique({ where: { email: input.email } });

    if (!user) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid email or password');
    }

    const passwordValid = await comparePassword(input.password, user.password);

    if (!passwordValid) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid email or password');
    }

    const token = signJwt({ userId: user.id, email: user.email });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      }
    };
  }

  async me(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: userSelect
    });

    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
    }

    return user;
  }
}
