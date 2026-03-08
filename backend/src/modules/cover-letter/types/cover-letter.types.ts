export interface GenerateCoverLetterInput {
  jobTitle?: string;
  companyName?: string;
  jobDescription: string;
  resumeText: string;
  tone?: string;
}

export interface SaveCoverLetterInput extends GenerateCoverLetterInput {
  generatedText: string;
}
