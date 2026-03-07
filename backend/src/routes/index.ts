import { Router } from 'express';
import authRoutes from './auth.routes';
import coverLetterRoutes from './cover-letter.routes';

const router = Router();

router.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

router.use('/auth', authRoutes);
router.use('/cover-letters', coverLetterRoutes);

export default router;
