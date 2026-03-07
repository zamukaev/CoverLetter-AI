import { StatusCodes } from 'http-status-codes';
import { prisma } from '../config/prisma';
import { ApiError } from '../utils/api-error';
import { AiService } from './ai.service';
import type {
  GenerateCoverLetterInput,
  SaveCoverLetterInput
} from '../modules/cover-letter/types/cover-letter.types';

export class CoverLetterService {
  private readonly aiService: AiService;

  constructor(aiService = new AiService()) {
    this.aiService = aiService;
  }

  generate(input: GenerateCoverLetterInput): Promise<string> {
    return this.aiService.generateCoverLetter(input);
  }

  save(userId: string, input: SaveCoverLetterInput) {
    return prisma.coverLetter.create({
      data: {
        userId,
        jobDescription: input.jobDescription,
        resumeText: input.resumeText,
        generatedText: input.generatedText,
        tone: input.tone
      }
    });
  }

  async listByUser(userId: string) {
    return prisma.coverLetter.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getById(userId: string, coverLetterId: string) {
    const letter = await prisma.coverLetter.findFirst({
      where: {
        id: coverLetterId,
        userId
      }
    });

    if (!letter) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Cover letter not found');
    }

    return letter;
  }

  async updateGeneratedText(userId: string, coverLetterId: string, generatedText: string) {
    await this.getById(userId, coverLetterId);

    return prisma.coverLetter.update({
      where: { id: coverLetterId },
      data: { generatedText }
    });
  }
}
