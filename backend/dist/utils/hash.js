"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const SALT_ROUNDS = 12;
const hashPassword = (rawPassword) => {
    return bcryptjs_1.default.hash(rawPassword, SALT_ROUNDS);
};
exports.hashPassword = hashPassword;
const comparePassword = (rawPassword, hashedPassword) => {
    return bcryptjs_1.default.compare(rawPassword, hashedPassword);
};
exports.comparePassword = comparePassword;
//# sourceMappingURL=hash.js.map