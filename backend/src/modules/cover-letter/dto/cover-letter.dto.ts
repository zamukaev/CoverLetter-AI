import { z } from 'zod';

const textField = z.string().trim().min(20).max(20000);

export const generateCoverLetterSchema = z.object({
  jobDescription: textField,
  resumeText: textField,
  tone: z.string().trim().min(2).max(50).optional()
});

export const saveCoverLetterSchema = z.object({
  jobDescription: textField,
  resumeText: textField,
  generatedText: z.string().trim().min(20).max(20000),
  tone: z.string().trim().min(2).max(50).optional()
});

export const updateCoverLetterSchema = z.object({
  generatedText: z.string().trim().min(20).max(20000)
});

export type GenerateCoverLetterDto = z.infer<typeof generateCoverLetterSchema>;
export type SaveCoverLetterDto = z.infer<typeof saveCoverLetterSchema>;
export type UpdateCoverLetterDto = z.infer<typeof updateCoverLetterSchema>;
