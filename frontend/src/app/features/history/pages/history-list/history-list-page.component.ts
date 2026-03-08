import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CoverLetterService } from '../../../../core/services/cover-letter.service';
import type { CoverLetter } from '../../../../core/types/models';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { HistoryCardComponent } from '../../components/history-card/history-card.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ToastComponent } from '../../../../shared/components/toast/toast.component';

@Component({
  selector: 'app-history-list-page',
  standalone: true,
  imports: [
    RouterLink,
    SpinnerComponent,
    EmptyStateComponent,
    HistoryCardComponent,
    PageHeaderComponent,
    ButtonComponent,
    ToastComponent
  ],
  template: `
    <section>
      <ui-page-header
        eyebrow="History"
        title="Your saved cover letters"
        subtitle="Search, review, and refine previous drafts across all your applications."
      >
        <a routerLink="/generator">
          <ui-button size="lg">Create New Letter</ui-button>
        </a>
      </ui-page-header>

      <div class="mb-5 ui-surface p-4 sm:p-5">
        <label for="search" class="ui-label">Search saved letters</label>
        <input
          id="search"
          type="search"
          class="ui-input"
          placeholder="Search by company, role, tone, or letter text"
          [value]="searchQuery()"
          (input)="searchQuery.set($any($event.target).value)"
        />
      </div>

      <ui-toast [message]="feedback()" variant="success" />

      @if (loading()) {
        <ui-spinner />
      } @else if (error()) {
        <p class="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{{ error() }}</p>
      } @else if (!letters().length) {
        <ui-empty-state
          title="No saved letters"
          description="Saved letters will appear here so you can quickly reuse and adapt them."
          icon="LIST"
        >
          <a routerLink="/generator">
            <ui-button size="sm">Generate Your First Letter</ui-button>
          </a>
        </ui-empty-state>

        <section class="mt-6 ui-surface p-5 sm:p-6">
          <h2 class="text-lg font-bold tracking-tight text-slate-900">Sample letters</h2>
          <p class="mt-1 text-sm text-slate-600">Preview how your saved letters will look once you start generating.</p>
          <div class="mt-4 grid gap-3 sm:grid-cols-2">
            @for (sample of sampleLetters; track sample.id) {
              <history-card [item]="sample" />
            }
          </div>
        </section>
      } @else if (!filteredLetters().length) {
        <ui-empty-state
          title="No results found"
          description="No letters match your search. Try a broader keyword or clear the filter."
          icon="SEARCH"
        >
          <ui-button size="sm" variant="secondary" (click)="searchQuery.set('')">Clear Filter</ui-button>
        </ui-empty-state>
      } @else {
        <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          @for (item of filteredLetters(); track item.id) {
            <history-card [item]="item" (delete)="removeFromList($event)" />
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
  readonly feedback = signal<string | null>(null);
  readonly searchQuery = signal('');

  readonly filteredLetters = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return this.letters();

    return this.letters().filter((item) => {
      const combined = [
        item.jobTitle,
        item.companyName,
        item.jobDescription,
        item.generatedText,
        item.tone
      ]
        .join(' ')
        .toLowerCase();

      return combined.includes(query);
    });
  });

  readonly sampleLetters: CoverLetter[] = [
    {
      id: 'sample-1',
      userId: 'sample',
      companyName: 'NovaPay',
      jobTitle: 'Product Marketing Manager',
      jobDescription: 'Product Marketing Manager at NovaPay',
      resumeText: '',
      generatedText:
        'Dear Hiring Manager, I am excited to apply for the Product Marketing Manager role at NovaPay...',
      tone: 'professional',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'sample-2',
      userId: 'sample',
      companyName: 'Brightlane',
      jobTitle: 'Growth Manager',
      jobDescription: 'Growth Manager at Brightlane',
      resumeText: '',
      generatedText:
        'Hello Brightlane Team, I would love to contribute to your growth strategy through data-led experiments...',
      tone: 'confident',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

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

  removeFromList(id: string): void {
    this.letters.update((items) => items.filter((item) => item.id !== id));
    this.feedback.set('Letter removed from this view');
  }
}
