import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { asyncHandler } from '../utils/async-handler';
import { validateBody } from '../middleware/validate.middleware';
import { loginSchema, registerSchema } from '../modules/auth/dto/auth.dto';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();
const controller = new AuthController();

router.post('/register', validateBody(registerSchema), asyncHandler(controller.register));
router.post('/login', validateBody(loginSchema), asyncHandler(controller.login));
router.get('/me', requireAuth, asyncHandler(controller.me));

export default router;
