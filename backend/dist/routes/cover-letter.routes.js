"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cover_letter_controller_1 = require("../controllers/cover-letter.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validate_middleware_1 = require("../middleware/validate.middleware");
const cover_letter_dto_1 = require("../modules/cover-letter/dto/cover-letter.dto");
const async_handler_1 = require("../utils/async-handler");
const router = (0, express_1.Router)();
const controller = new cover_letter_controller_1.CoverLetterController();
router.use(auth_middleware_1.requireAuth);
router.post('/generate', (0, validate_middleware_1.validateBody)(cover_letter_dto_1.generateCoverLetterSchema), (0, async_handler_1.asyncHandler)(controller.generate));
router.post('/', (0, validate_middleware_1.validateBody)(cover_letter_dto_1.saveCoverLetterSchema), (0, async_handler_1.asyncHandler)(controller.save));
router.get('/', (0, async_handler_1.asyncHandler)(controller.list));
router.get('/:id', (0, async_handler_1.asyncHandler)(controller.detail));
router.patch('/:id', (0, validate_middleware_1.validateBody)(cover_letter_dto_1.updateCoverLetterSchema), (0, async_handler_1.asyncHandler)(controller.update));
exports.default = router;
//# sourceMappingURL=cover-letter.routes.js.map