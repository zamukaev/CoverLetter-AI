import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CoverLetterService } from '../../../../core/services/cover-letter.service';
import type { CoverLetter } from '../../../../core/types/models';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-history-detail-page',
  standalone: true,
  imports: [RouterLink, DatePipe, SpinnerComponent],
  template: `
    <section>
      <a routerLink="/history" class="text-sm font-semibold text-emerald-700">← Back to history</a>

      @if (loading()) {
        <ui-spinner />
      } @else if (error()) {
        <p class="mt-4 rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700">{{ error() }}</p>
      } @else if (letter()) {
        <div class="mt-4 rounded-2xl border border-slate-200 bg-white p-6">
          <div class="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 class="text-2xl font-bold text-slate-900">Cover Letter Detail</h1>
              <p class="mt-1 text-sm text-slate-500">Created: {{ letter()!.createdAt | date: 'medium' }}</p>
            </div>
            <div class="flex gap-2">
              <button type="button" (click)="copyText()" class="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-100">Copy</button>
              <button type="button" (click)="downloadText()" class="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-100">Download .txt</button>
              <button type="button" (click)="saveUpdates()" class="rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-emerald-500">Save changes</button>
            </div>
          </div>

          <div class="mt-5 grid gap-4 md:grid-cols-2">
            <div>
              <h2 class="mb-2 text-sm font-semibold text-slate-700">Job Description</h2>
              <p class="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">{{ letter()!.jobDescription }}</p>
            </div>
            <div>
              <h2 class="mb-2 text-sm font-semibold text-slate-700">Resume Text</h2>
              <p class="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">{{ letter()!.resumeText }}</p>
            </div>
          </div>

          <div class="mt-5">
            <h2 class="mb-2 text-sm font-semibold text-slate-700">Generated Letter (Editable)</h2>
            <textarea
              [value]="generatedText()"
              (input)="generatedText.set($any($event.target).value)"
              rows="16"
              class="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm leading-6 outline-none ring-emerald-500 focus:ring-2"
            ></textarea>
          </div>

          @if (success()) {
            <p class="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{{ success() }}</p>
          }
          @if (updateError()) {
            <p class="mt-3 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{{ updateError() }}</p>
          }
        </div>
      }
    </section>
  `
})
export class HistoryDetailPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly coverLetterService = inject(CoverLetterService);

  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly letter = signal<CoverLetter | null>(null);
  readonly generatedText = signal('');
  readonly success = signal<string | null>(null);
  readonly updateError = signal<string | null>(null);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.error.set('Missing cover letter id');
      this.loading.set(false);
      return;
    }

    this.coverLetterService.detail(id).subscribe({
      next: (res) => {
        this.letter.set(res.coverLetter);
        this.generatedText.set(res.coverLetter.generatedText);
        this.loading.set(false);
      },
      error: (err: { error?: { message?: string } }) => {
        this.error.set(err.error?.message ?? 'Unable to load cover letter');
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
    link.download = `cover-letter-${this.letter()?.id ?? 'draft'}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    this.success.set('Download started');
  }

  saveUpdates(): void {
    const id = this.letter()?.id;
    if (!id) return;

    this.success.set(null);
    this.updateError.set(null);

    this.coverLetterService.update(id, this.generatedText()).subscribe({
      next: (res) => {
        this.letter.set(res.coverLetter);
        this.success.set('Cover letter updated');
      },
      error: (err: { error?: { message?: string } }) => {
        this.updateError.set(err.error?.message ?? 'Failed to update cover letter');
      }
    });
  }
}
