import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import type {
  CoverLetter,
  GenerateCoverLetterPayload,
  SaveCoverLetterPayload
} from '../types/models';

@Injectable({ providedIn: 'root' })
export class CoverLetterService {
  private readonly http = inject(HttpClient);

  generate(payload: GenerateCoverLetterPayload) {
    return this.http.post<{ generatedText: string }>(`${environment.apiUrl}/cover-letters/generate`, payload);
  }

  save(payload: SaveCoverLetterPayload) {
    return this.http.post<{ coverLetter: CoverLetter }>(`${environment.apiUrl}/cover-letters`, payload);
  }

  list() {
    return this.http.get<{ data: CoverLetter[] }>(`${environment.apiUrl}/cover-letters`);
  }

  detail(id: string) {
    return this.http.get<{ coverLetter: CoverLetter }>(`${environment.apiUrl}/cover-letters/${id}`);
  }

  update(id: string, generatedText: string) {
    return this.http.patch<{ coverLetter: CoverLetter }>(
      `${environment.apiUrl}/cover-letters/${id}`,
      { generatedText }
    );
  }
}
