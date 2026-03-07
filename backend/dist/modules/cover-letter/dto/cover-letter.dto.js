"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCoverLetterSchema = exports.saveCoverLetterSchema = exports.generateCoverLetterSchema = void 0;
const zod_1 = require("zod");
const textField = zod_1.z.string().trim().min(20).max(20000);
exports.generateCoverLetterSchema = zod_1.z.object({
    jobDescription: textField,
    resumeText: textField,
    tone: zod_1.z.string().trim().min(2).max(50).optional()
});
exports.saveCoverLetterSchema = zod_1.z.object({
    jobDescription: textField,
    resumeText: textField,
    generatedText: zod_1.z.string().trim().min(20).max(20000),
    tone: zod_1.z.string().trim().min(2).max(50).optional()
});
exports.updateCoverLetterSchema = zod_1.z.object({
    generatedText: zod_1.z.string().trim().min(20).max(20000)
});
//# sourceMappingURL=cover-letter.dto.js.map