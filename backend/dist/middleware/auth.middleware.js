"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const http_status_codes_1 = require("http-status-codes");
const api_error_1 = require("../utils/api-error");
const jwt_1 = require("../utils/jwt");
const requireAuth = (req, _res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        next(new api_error_1.ApiError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Missing or invalid authorization header"));
        return;
    }
    try {
        const token = authHeader.split(" ")[1];
        if (!token) {
            next(new api_error_1.ApiError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Missing bearer token"));
            return;
        }
        req.user = (0, jwt_1.verifyJwt)(token);
        next();
    }
    catch (_error) {
        next(new api_error_1.ApiError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Invalid or expired token"));
    }
};
exports.requireAuth = requireAuth;
//# sourceMappingURL=auth.middleware.js.map