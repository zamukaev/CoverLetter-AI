"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const http_status_codes_1 = require("http-status-codes");
const prisma_1 = require("../config/prisma");
const api_error_1 = require("../utils/api-error");
const hash_1 = require("../utils/hash");
const jwt_1 = require("../utils/jwt");
const userSelect = {
    id: true,
    name: true,
    email: true,
    createdAt: true
};
class AuthService {
    async register(input) {
        const existingUser = await prisma_1.prisma.user.findUnique({ where: { email: input.email } });
        if (existingUser) {
            throw new api_error_1.ApiError(http_status_codes_1.StatusCodes.CONFLICT, 'Email already in use');
        }
        const password = await (0, hash_1.hashPassword)(input.password);
        const user = await prisma_1.prisma.user.create({
            data: {
                name: input.name,
                email: input.email,
                password
            },
            select: userSelect
        });
        const token = (0, jwt_1.signJwt)({ userId: user.id, email: user.email });
        return { token, user };
    }
    async login(input) {
        const user = await prisma_1.prisma.user.findUnique({ where: { email: input.email } });
        if (!user) {
            throw new api_error_1.ApiError(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Invalid email or password');
        }
        const passwordValid = await (0, hash_1.comparePassword)(input.password, user.password);
        if (!passwordValid) {
            throw new api_error_1.ApiError(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Invalid email or password');
        }
        const token = (0, jwt_1.signJwt)({ userId: user.id, email: user.email });
        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt
            }
        };
    }
    async me(userId) {
        const user = await prisma_1.prisma.user.findUnique({
            where: { id: userId },
            select: userSelect
        });
        if (!user) {
            throw new api_error_1.ApiError(http_status_codes_1.StatusCodes.NOT_FOUND, 'User not found');
        }
        return user;
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map