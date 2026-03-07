export interface GenerateCoverLetterInput {
  jobDescription: string;
  resumeText: string;
  tone?: string;
}

export interface SaveCoverLetterInput extends GenerateCoverLetterInput {
  generatedText: string;
}
