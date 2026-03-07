import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CoverLetterService } from '../../../../core/services/cover-letter.service';
import { GeneratorFormComponent } from '../../components/generator-form/generator-form.component';
import { GeneratorPreviewComponent } from '../../components/generator-preview/generator-preview.component';
import type { GenerateCoverLetterPayload, SaveCoverLetterPayload } from '../../../../core/types/models';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-generator-page',
  standalone: true,
  imports: [GeneratorFormComponent, GeneratorPreviewComponent, SpinnerComponent],
  template: `
    <section class="grid gap-6 lg:grid-cols-2">
      <div class="rounded-2xl border border-slate-200 bg-white p-6">
        <h1 class="text-2xl font-bold text-slate-900">Cover Letter Generator</h1>
        <p class="mt-2 text-sm text-slate-600">Paste job details and your resume, then generate a tailored letter.</p>
        <div class="mt-5">
          <generator-form (submitted)="onGenerate($event)" />
        </div>
      </div>

      <div>
        @if (loading()) {
          <div class="rounded-2xl border border-slate-200 bg-white p-6">
            <ui-spinner />
            <p class="text-center text-sm text-slate-600">Generating your letter...</p>
          </div>
        } @else if (generatedText()) {
          <generator-preview
            [text]="generatedText()"
            (textChange)="generatedText.set($event)"
            (copy)="copyText()"
            (download)="downloadText()"
            (save)="saveLetter()"
          />
        } @else {
          <div class="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-sm text-slate-600">
            Generated content will appear here.
          </div>
        }

        @if (error()) {
          <p class="mt-3 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{{ error() }}</p>
        }
        @if (success()) {
          <p class="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{{ success() }}</p>
        }
      </div>
    </section>
  `
})
export class GeneratorPageComponent {
  private readonly coverLetterService = inject(CoverLetterService);
  private readonly router = inject(Router);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly success = signal<string | null>(null);
  readonly generatedText = signal('');
  readonly latestPayload = signal<GenerateCoverLetterPayload | null>(null);

  onGenerate(payload: GenerateCoverLetterPayload): void {
    this.loading.set(true);
    this.error.set(null);
    this.success.set(null);
    this.latestPayload.set(payload);

    this.coverLetterService.generate(payload).subscribe({
      next: (res) => {
        this.generatedText.set(res.generatedText);
        this.loading.set(false);
      },
      error: (err: { error?: { message?: string } }) => {
        this.error.set(err.error?.message ?? 'Failed to generate cover letter');
        this.loading.set(false);
      }
    });
  }

  copyText(): void {
    void navigator.clipboard.writeText(this.generatedText());
    this.success.set('Copied to clipboard');
  }

  downloadText(): void {
    const blob = new Blob([this.generatedText()], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'cover-letter.txt';
    link.click();
    URL.revokeObjectURL(url);
    this.success.set('Download started');
  }

  saveLetter(): void {
    const payload = this.latestPayload();

    if (!payload || !this.generatedText().trim()) {
      this.error.set('Generate content before saving');
      return;
    }

    const savePayload: SaveCoverLetterPayload = {
      ...payload,
      generatedText: this.generatedText()
    };

    this.coverLetterService.save(savePayload).subscribe({
      next: (res) => {
        this.success.set('Cover letter saved');
        void this.router.navigate(['/history', res.coverLetter.id]);
      },
      error: (err: { error?: { message?: string } }) => {
        this.error.set(err.error?.message ?? 'Failed to save cover letter');
      }
    });
  }
}
