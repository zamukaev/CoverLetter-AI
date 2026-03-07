import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CoverLetterService } from '../../../../core/services/cover-letter.service';
import type { CoverLetter } from '../../../../core/types/models';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { HistoryCardComponent } from '../../components/history-card/history-card.component';

@Component({
  selector: 'app-history-list-page',
  standalone: true,
  imports: [RouterLink, SpinnerComponent, EmptyStateComponent, HistoryCardComponent],
  template: `
    <section>
      <div class="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 class="text-2xl font-bold text-slate-900">Cover Letter History</h1>
          <p class="mt-1 text-slate-600">Review and edit your previously generated letters.</p>
        </div>
        <a routerLink="/generator" class="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800">Generate New</a>
      </div>

      @if (loading()) {
        <ui-spinner />
      } @else if (error()) {
        <p class="rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700">{{ error() }}</p>
      } @else if (!letters().length) {
        <ui-empty-state
          title="No saved letters"
          description="Generated letters you save will appear here."
        >
          <a routerLink="/generator" class="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Open Generator</a>
        </ui-empty-state>
      } @else {
        <div class="grid gap-3 sm:grid-cols-2">
          @for (item of letters(); track item.id) {
            <history-card [item]="item" />
          }
        </div>
      }
    </section>
  `
})
export class HistoryListPageComponent {
  private readonly coverLetterService = inject(CoverLetterService);

  readonly letters = signal<CoverLetter[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  constructor() {
    this.coverLetterService.list().subscribe({
      next: (res) => {
        this.letters.set(res.data);
        this.loading.set(false);
      },
      error: (err: { error?: { message?: string } }) => {
        this.error.set(err.error?.message ?? 'Unable to load history');
        this.loading.set(false);
      }
    });
  }
}
