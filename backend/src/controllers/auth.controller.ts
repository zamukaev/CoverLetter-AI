import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AuthService } from '../services/auth.service';

const authService = new AuthService();

export class AuthController {
  register = async (req: Request, res: Response): Promise<void> => {
    const response = await authService.register(req.body);
    res.status(StatusCodes.CREATED).json(response);
  };

  login = async (req: Request, res: Response): Promise<void> => {
    const response = await authService.login(req.body);
    res.status(StatusCodes.OK).json(response);
  };

  me = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.userId;
    const user = await authService.me(userId!);
    res.status(StatusCodes.OK).json({ user });
  };
}
