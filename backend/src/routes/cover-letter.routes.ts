import { Router } from 'express';
import { CoverLetterController } from '../controllers/cover-letter.controller';
import { requireAuth } from '../middleware/auth.middleware';
import { validateBody } from '../middleware/validate.middleware';
import {
  generateCoverLetterSchema,
  saveCoverLetterSchema,
  updateCoverLetterSchema
} from '../modules/cover-letter/dto/cover-letter.dto';
import { asyncHandler } from '../utils/async-handler';

const router = Router();
const controller = new CoverLetterController();

router.use(requireAuth);

router.post('/generate', validateBody(generateCoverLetterSchema), asyncHandler(controller.generate));
router.post('/', validateBody(saveCoverLetterSchema), asyncHandler(controller.save));
router.get('/', asyncHandler(controller.list));
router.get('/:id', asyncHandler(controller.detail));
router.patch('/:id', validateBody(updateCoverLetterSchema), asyncHandler(controller.update));

export default router;
