import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CoverLetterService } from '../../../../core/services/cover-letter.service';
import type { CoverLetter } from '../../../../core/types/models';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { ToastComponent } from '../../../../shared/components/toast/toast.component';

@Component({
  selector: 'app-history-detail-page',
  standalone: true,
  imports: [RouterLink, DatePipe, SpinnerComponent, ButtonComponent, PageHeaderComponent, ToastComponent],
  template: `
    <section>
      <a routerLink="/history" class="mb-4 inline-flex text-sm font-semibold text-blue-700 hover:text-blue-600">Back to saved letters</a>

      @if (loading()) {
        <ui-spinner />
      } @else if (error()) {
        <p class="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{{ error() }}</p>
      } @else if (letter()) {
        <ui-page-header
          eyebrow="Cover Letter"
          title="Review and Edit"
          subtitle="Make final improvements, then save, copy, or download your letter."
        >
          <div class="flex flex-wrap gap-2">
            <ui-button size="sm" variant="secondary" (click)="copyText()">Copy</ui-button>
            <ui-button size="sm" variant="secondary" (click)="downloadText()">Download TXT</ui-button>
            <ui-button size="sm" variant="ghost" (click)="regeneratePlaceholder()">Regenerate (Coming Soon)</ui-button>
            <ui-button size="sm" (click)="saveUpdates()">Save</ui-button>
          </div>
        </ui-page-header>

        <div class="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <article class="ui-surface p-6 sm:p-7">
            <label for="generatedText" class="ui-label">Cover letter content (editable)</label>
            <textarea
              id="generatedText"
              [value]="generatedText()"
              (input)="generatedText.set($any($event.target).value)"
              rows="20"
              class="ui-textarea"
            ></textarea>
          </article>

          <aside class="space-y-4">
            <article class="ui-surface p-5 sm:p-6">
              <h3 class="text-lg font-bold tracking-tight text-slate-900">Metadata</h3>
              <dl class="mt-3 space-y-2 text-sm">
                <div class="flex justify-between gap-3">
                  <dt class="text-slate-500">Job title</dt>
                  <dd class="text-right font-medium text-slate-800">{{ letter()!.jobTitle || deriveJobTitle(letter()!) }}</dd>
                </div>
                <div class="flex justify-between gap-3">
                  <dt class="text-slate-500">Company</dt>
                  <dd class="text-right font-medium text-slate-800">{{ letter()!.companyName || deriveCompany(letter()!) }}</dd>
                </div>
                <div class="flex justify-between gap-3">
                  <dt class="text-slate-500">Tone</dt>
                  <dd class="text-right font-medium capitalize text-slate-800">{{ letter()!.tone || 'professional' }}</dd>
                </div>
                <div class="flex justify-between gap-3">
                  <dt class="text-slate-500">Created</dt>
                  <dd class="text-right font-medium text-slate-800">{{ letter()!.createdAt | date: 'medium' }}</dd>
                </div>
                <div class="flex justify-between gap-3">
                  <dt class="text-slate-500">Updated</dt>
                  <dd class="text-right font-medium text-slate-800">{{ letter()!.updatedAt | date: 'medium' }}</dd>
                </div>
              </dl>
            </article>

            <article class="ui-surface p-5 sm:p-6">
              <h3 class="text-lg font-bold tracking-tight text-slate-900">Source Details</h3>
              <p class="mt-2 text-xs uppercase tracking-[0.14em] text-slate-400">Job description</p>
              <p class="mt-2 text-sm leading-6 text-slate-600">{{ letter()!.jobDescription }}</p>
            </article>
          </aside>
        </div>

        <div class="mt-3 space-y-2">
          <ui-toast [message]="success()" variant="success" />
          <ui-toast [message]="updateError()" variant="error" />
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

  regeneratePlaceholder(): void {
    this.success.set('Regenerate options will be available soon');
  }

  saveUpdates(): void {
    const id = this.letter()?.id;
    if (!id) return;

    this.success.set(null);
    this.updateError.set(null);

    this.coverLetterService.update(id, this.generatedText()).subscribe({
      next: (res) => {
        this.letter.set(res.coverLetter);
        this.success.set('Cover letter updated successfully');
      },
      error: (err: { error?: { message?: string } }) => {
        this.updateError.set(err.error?.message ?? 'Failed to update cover letter');
      }
    });
  }

  deriveJobTitle(letter: CoverLetter): string {
    const beforeAt = letter.jobDescription.split(/\sat\s/i)[0]?.trim();
    return beforeAt || 'Not specified';
  }

  deriveCompany(letter: CoverLetter): string {
    const parts = letter.jobDescription.split(/\sat\s/i);
    return parts[1]?.trim().slice(0, 40) || 'Not specified';
  }
}
