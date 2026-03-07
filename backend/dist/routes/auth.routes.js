"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const async_handler_1 = require("../utils/async-handler");
const validate_middleware_1 = require("../middleware/validate.middleware");
const auth_dto_1 = require("../modules/auth/dto/auth.dto");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
const controller = new auth_controller_1.AuthController();
router.post('/register', (0, validate_middleware_1.validateBody)(auth_dto_1.registerSchema), (0, async_handler_1.asyncHandler)(controller.register));
router.post('/login', (0, validate_middleware_1.validateBody)(auth_dto_1.loginSchema), (0, async_handler_1.asyncHandler)(controller.login));
router.get('/me', auth_middleware_1.requireAuth, (0, async_handler_1.asyncHandler)(controller.me));
exports.default = router;
//# sourceMappingURL=auth.routes.js.map