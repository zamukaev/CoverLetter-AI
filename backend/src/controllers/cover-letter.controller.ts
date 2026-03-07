import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../utils/api-error";
import { CoverLetterService } from "../services/cover-letter.service";

const coverLetterService = new CoverLetterService();

export class CoverLetterController {
  generate = async (req: Request, res: Response): Promise<void> => {
    const generatedText = await coverLetterService.generate(req.body);

    res.status(StatusCodes.OK).json({
      generatedText,
    });
  };

  save = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.userId;
    const letter = await coverLetterService.save(userId!, req.body);

    res.status(StatusCodes.CREATED).json({
      coverLetter: letter,
    });
  };

  list = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.userId;
    const letters = await coverLetterService.listByUser(userId!);

    res.status(StatusCodes.OK).json({
      data: letters,
    });
  };

  detail = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.userId;
    const letterId = req.params.id;

    if (!letterId) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "Cover letter id is required",
      );
    }

    const letter = await coverLetterService.getById(userId!, letterId);

    res.status(StatusCodes.OK).json({
      coverLetter: letter,
    });
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.userId;
    const letterId = req.params.id;

    if (!letterId) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "Cover letter id is required",
      );
    }

    const letter = await coverLetterService.updateGeneratedText(
      userId!,
      letterId,
      req.body.generatedText,
    );

    res.status(StatusCodes.OK).json({
      coverLetter: letter,
    });
  };
}
