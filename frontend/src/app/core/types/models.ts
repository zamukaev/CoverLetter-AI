export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface CoverLetter {
  id: string;
  userId: string;
  jobTitle?: string;
  companyName?: string;
  jobDescription: string;
  resumeText: string;
  generatedText: string;
  tone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GenerateCoverLetterPayload {
  jobTitle?: string;
  companyName?: string;
  jobDescription: string;
  resumeText: string;
  tone?: string;
}

export interface SaveCoverLetterPayload extends GenerateCoverLetterPayload {
  generatedText: string;
}
