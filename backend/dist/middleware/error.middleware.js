"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = exports.notFoundMiddleware = void 0;
const http_status_codes_1 = require("http-status-codes");
const api_error_1 = require("../utils/api-error");
const notFoundMiddleware = (req, _res, next) => {
    next(new api_error_1.ApiError(http_status_codes_1.StatusCodes.NOT_FOUND, `Route not found: ${req.originalUrl}`));
};
exports.notFoundMiddleware = notFoundMiddleware;
const errorMiddleware = (err, _req, res, _next) => {
    if (err instanceof api_error_1.ApiError) {
        res.status(err.statusCode).json({
            message: err.message
        });
        return;
    }
    if (err instanceof Error) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: err.message
        });
        return;
    }
    res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error'
    });
};
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=error.middleware.js.map