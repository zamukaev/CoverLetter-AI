"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = void 0;
const http_status_codes_1 = require("http-status-codes");
const validateBody = (schema) => {
    return (req, res, next) => {
        const parsed = schema.safeParse(req.body);
        if (!parsed.success) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                message: 'Validation failed',
                errors: parsed.error.flatten().fieldErrors
            });
            return;
        }
        req.body = parsed.data;
        next();
    };
};
exports.validateBody = validateBody;
//# sourceMappingURL=validate.middleware.js.map