import { StatusCodes } from "http-status-codes";
import OpenAI from "openai";
import { env } from "../config/env";
import type { GenerateCoverLetterInput } from "../modules/cover-letter/types/cover-letter.types";
import { ApiError } from "../utils/api-error";

const OPENAI_MODEL = "gpt-5.4"; // Use the latest available model for best results

export interface AiProvider {
  generateCoverLetter(input: GenerateCoverLetterInput): Promise<string>;
}

class OpenAIProvider implements AiProvider {
  private readonly client: OpenAI;

  constructor() {
    if (!env.OPENAI_API_KEY) {
      throw new ApiError(
        StatusCodes.SERVICE_UNAVAILABLE,
        "OPENAI_API_KEY is not configured. Add it to backend/.env and restart the server.",
      );
    }

    this.client = new OpenAI({ apiKey: env.OPENAI_API_KEY });
  }

  async generateCoverLetter(input: GenerateCoverLetterInput): Promise<string> {
    const roleContext = [
      input.jobTitle ? `Job Title: ${input.jobTitle}` : null,
      input.companyName ? `Company Name: ${input.companyName}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const prompt = `
      Write a professional, specific cover letter based on the role context, job description, and resume.
      Use a ${input.tone || "neutral"} tone.

      ${roleContext || "Role Context: not provided"}

      Job Description:
      ${input.jobDescription}

      Resume:
      ${input.resumeText}

      The letter should have:
      - greeting
      - introduction that connects the candidate's experience to the job
      - 2-3 body paragraphs highlighting relevant skills and achievements
      - closing statement expressing interest and next steps
    `;

    try {
      const response = await this.client.responses.create({
        model: OPENAI_MODEL,
        input: prompt,
      });

      const outputText = response.output_text.trim();
      if (!outputText) {
        throw new ApiError(
          StatusCodes.BAD_GATEWAY,
          "AI provider returned an empty response. Please try again.",
        );
      }

      return outputText;
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        throw error;
      }

      const openAiError = error as {
        status?: number;
        message?: string;
        error?: { message?: string };
      };

      const providerMessage =
        openAiError.error?.message ??
        openAiError.message ??
        "OpenAI request failed";

      if (openAiError.status === StatusCodes.UNAUTHORIZED) {
        throw new ApiError(
          StatusCodes.SERVICE_UNAVAILABLE,
          "OpenAI authentication failed. Check OPENAI_API_KEY.",
        );
      }

      if (openAiError.status === StatusCodes.NOT_FOUND) {
        throw new ApiError(
          StatusCodes.SERVICE_UNAVAILABLE,
          `OpenAI model '${OPENAI_MODEL}' is not available for this account.`,
        );
      }

      throw new ApiError(
        StatusCodes.BAD_GATEWAY,
        `AI generation failed: ${providerMessage} <>`,
      );
    }
  }
}

export class AiService {
  constructor(private readonly provider: AiProvider = new OpenAIProvider()) {}

  generateCoverLetter(input: GenerateCoverLetterInput): Promise<string> {
    return this.provider.generateCoverLetter(input);
  }
}
