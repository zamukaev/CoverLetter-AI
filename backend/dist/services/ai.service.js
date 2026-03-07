"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiService = void 0;
class PlaceholderAiProvider {
    async generateCoverLetter(input) {
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
class AiService {
    provider;
    constructor(provider = new PlaceholderAiProvider()) {
        this.provider = provider;
    }
    generateCoverLetter(input) {
        return this.provider.generateCoverLetter(input);
    }
}
exports.AiService = AiService;
//# sourceMappingURL=ai.service.js.map