"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoverLetterController = void 0;
const http_status_codes_1 = require("http-status-codes");
const api_error_1 = require("../utils/api-error");
const cover_letter_service_1 = require("../services/cover-letter.service");
const coverLetterService = new cover_letter_service_1.CoverLetterService();
class CoverLetterController {
    generate = async (req, res) => {
        const generatedText = await coverLetterService.generate(req.body);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            generatedText,
        });
    };
    save = async (req, res) => {
        const userId = req.user?.userId;
        const letter = await coverLetterService.save(userId, req.body);
        res.status(http_status_codes_1.StatusCodes.CREATED).json({
            coverLetter: letter,
        });
    };
    list = async (req, res) => {
        const userId = req.user?.userId;
        const letters = await coverLetterService.listByUser(userId);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            data: letters,
        });
    };
    detail = async (req, res) => {
        const userId = req.user?.userId;
        const letterId = req.params.id;
        if (!letterId) {
            throw new api_error_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Cover letter id is required");
        }
        const letter = await coverLetterService.getById(userId, letterId);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            coverLetter: letter,
        });
    };
    update = async (req, res) => {
        const userId = req.user?.userId;
        const letterId = req.params.id;
        if (!letterId) {
            throw new api_error_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Cover letter id is required");
        }
        const letter = await coverLetterService.updateGeneratedText(userId, letterId, req.body.generatedText);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            coverLetter: letter,
        });
    };
}
exports.CoverLetterController = CoverLetterController;
//# sourceMappingURL=cover-letter.controller.js.map