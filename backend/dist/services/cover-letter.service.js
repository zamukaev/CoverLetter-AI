"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoverLetterService = void 0;
const http_status_codes_1 = require("http-status-codes");
const prisma_1 = require("../config/prisma");
const api_error_1 = require("../utils/api-error");
const ai_service_1 = require("./ai.service");
class CoverLetterService {
    aiService;
    constructor(aiService = new ai_service_1.AiService()) {
        this.aiService = aiService;
    }
    generate(input) {
        return this.aiService.generateCoverLetter(input);
    }
    save(userId, input) {
        return prisma_1.prisma.coverLetter.create({
            data: {
                userId,
                jobDescription: input.jobDescription,
                resumeText: input.resumeText,
                generatedText: input.generatedText,
                tone: input.tone
            }
        });
    }
    async listByUser(userId) {
        return prisma_1.prisma.coverLetter.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' }
        });
    }
    async getById(userId, coverLetterId) {
        const letter = await prisma_1.prisma.coverLetter.findFirst({
            where: {
                id: coverLetterId,
                userId
            }
        });
        if (!letter) {
            throw new api_error_1.ApiError(http_status_codes_1.StatusCodes.NOT_FOUND, 'Cover letter not found');
        }
        return letter;
    }
    async updateGeneratedText(userId, coverLetterId, generatedText) {
        await this.getById(userId, coverLetterId);
        return prisma_1.prisma.coverLetter.update({
            where: { id: coverLetterId },
            data: { generatedText }
        });
    }
}
exports.CoverLetterService = CoverLetterService;
//# sourceMappingURL=cover-letter.service.js.map