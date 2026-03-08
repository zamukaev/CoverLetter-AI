import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CoverLetterService } from '../../../../core/services/cover-letter.service';
import { GeneratorFormComponent } from '../../components/generator-form/generator-form.component';
import { GeneratorPreviewComponent } from '../../components/generator-preview/generator-preview.component';
import type {
  GenerateCoverLetterPayload,
  SaveCoverLetterPayload,
} from '../../../../core/types/models';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { ToastComponent } from '../../../../shared/components/toast/toast.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-generator-page',
  standalone: true,
  imports: [
    GeneratorFormComponent,
    GeneratorPreviewComponent,
    SpinnerComponent,
    ToastComponent,
    PageHeaderComponent,
  ],
  template: `
    <section>
      <ui-page-header
        eyebrow="Generator"
        title="Generate a tailored cover letter"
        subtitle="Paste the role details and your resume context, then create a polished draft in seconds."
      />

      <div class="grid gap-6 xl:grid-cols-[1.03fr_0.97fr]">
        <div class="space-y-5">
          <article class="ui-surface p-6 sm:p-7">
            <generator-form [loading]="loading()" (submitted)="onGenerate($event)" />
          </article>

          <article class="ui-surface p-6 sm:p-7">
            <h3 class="text-lg font-bold tracking-tight text-slate-900">
              Tips for stronger results
            </h3>
            <ul class="mt-4 space-y-2.5 text-sm text-slate-600">
              <li class="ui-surface-soft px-3 py-2.5">
                Include the full job description, not only the role title.
              </li>
              <li class="ui-surface-soft px-3 py-2.5">
                Add measurable outcomes from your experience whenever possible.
              </li>
              <li class="ui-surface-soft px-3 py-2.5">
                Try different tones and choose the version that fits the company best.
              </li>
            </ul>
          </article>
        </div>

        <div class="space-y-3">
          @if (loading()) {
            <div class="ui-surface p-7">
              <ui-spinner />
              <div class="mt-2 space-y-2">
                <div class="ui-loading-line w-3/4"></div>
                <div class="ui-loading-line w-2/3"></div>
              </div>
              <p class="mt-4 text-center text-sm text-slate-600">Generating your draft...</p>
            </div>
          } @else if (generatedText()) {
            <generator-preview
              [text]="generatedText()"
              (textChange)="generatedText.set($event)"
              (copy)="copyText()"
              (download)="downloadText()"
              (save)="saveLetter()"
              (regenerate)="showRegeneratePlaceholder()"
            />
          } @else {
            <div
              class="ui-surface border-dashed bg-slate-50 p-10 text-center text-sm text-slate-600"
            >
              Your generated draft will appear here after you submit the form.
            </div>
          }

          <ui-toast [message]="success()" variant="success" />
          <ui-toast [message]="error()" variant="error" />
        </div>
      </div>
    </section>
  `,
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
      },
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

  showRegeneratePlaceholder(): void {
    this.success.set('Regenerate variations will be available soon');
  }

  saveLetter(): void {
    const payload = this.latestPayload();

    if (!payload || !this.generatedText().trim()) {
      this.error.set('Generate content before saving');
      return;
    }

    const savePayload: SaveCoverLetterPayload = {
      ...payload,
      generatedText: this.generatedText(),
    };

    this.coverLetterService.save(savePayload).subscribe({
      next: (res) => {
        this.success.set('Cover letter saved');
        void this.router.navigate(['/history', res.coverLetter.id]);
      },
      error: (err: { error?: { message?: string } }) => {
        this.error.set(err.error?.message ?? 'Failed to save cover letter');
      },
    });
  }
}
