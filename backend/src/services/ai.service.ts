import type { GenerateCoverLetterInput } from '../modules/cover-letter/types/cover-letter.types';

export interface AiProvider {
  generateCoverLetter(input: GenerateCoverLetterInput): Promise<string>;
}

class PlaceholderAiProvider implements AiProvider {
  async generateCoverLetter(input: GenerateCoverLetterInput): Promise<string> {
    const tone = input.tone ?? 'professional';

    return [
      'Dear Hiring Manager,',
      '',
      `I am writing to express my interest in the role described. Based on my experience, I believe I can contribute effectively to your team.`,
      '',
      `In my background, I have developed relevant skills and delivered measurable outcomes that align with your requirements. I am particularly motivated by this opportunity and its impact.`,
      '',
      `This draft was generated with a ${tone} tone using placeholder AI logic. Replace PlaceholderAiProvider in src/services/ai.service.ts to integrate OpenAI.`,
      '',
      'Thank you for your consideration.',
      'Sincerely,',
      '[Your Name]'
    ].join('\n');
  }
}

export class AiService {
  constructor(private readonly provider: AiProvider = new PlaceholderAiProvider()) {}

  generateCoverLetter(input: GenerateCoverLetterInput): Promise<string> {
    return this.provider.generateCoverLetter(input);
  }
}
