"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const http_status_codes_1 = require("http-status-codes");
const auth_service_1 = require("../services/auth.service");
const authService = new auth_service_1.AuthService();
class AuthController {
    register = async (req, res) => {
        const response = await authService.register(req.body);
        res.status(http_status_codes_1.StatusCodes.CREATED).json(response);
    };
    login = async (req, res) => {
        const response = await authService.login(req.body);
        res.status(http_status_codes_1.StatusCodes.OK).json(response);
    };
    me = async (req, res) => {
        const userId = req.user?.userId;
        const user = await authService.me(userId);
        res.status(http_status_codes_1.StatusCodes.OK).json({ user });
    };
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map