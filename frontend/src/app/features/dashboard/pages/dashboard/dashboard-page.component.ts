import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CoverLetterService } from '../../../../core/services/cover-letter.service';
import { AuthService } from '../../../../core/services/auth.service';
import type { CoverLetter } from '../../../../core/types/models';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { StatsCardComponent } from '../../../../shared/components/stats-card/stats-card.component';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe,
    EmptyStateComponent,
    PageHeaderComponent,
    StatsCardComponent,
    SpinnerComponent,
    ButtonComponent
  ],
  template: `
    <section>
      <ui-page-header
        eyebrow="Dashboard"
        [title]="'Welcome, ' + (authService.user()?.name || 'there')"
        subtitle="Track your output, revisit your best letters, and stay consistent across every application."
      >
        <a routerLink="/generator">
          <ui-button size="lg">Create New Letter</ui-button>
        </a>
      </ui-page-header>

      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <ui-stats-card label="Letters generated" [value]="stats().total" note="All-time total" />
        <ui-stats-card label="Saved letters" [value]="stats().saved" note="Ready to reuse" />
        <ui-stats-card label="Recent activity" [value]="stats().lastWeek" note="In last 7 days" />
        <ui-stats-card label="Last used tone" [value]="stats().latestTone" note="From latest draft" />
      </div>

      <div class="mt-6 grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">
        <section class="ui-surface p-6 sm:p-7">
          <div class="mb-4 flex items-center justify-between">
            <h2 class="text-xl font-bold tracking-tight text-slate-900">Recent Letters</h2>
            <a routerLink="/history" class="text-sm font-semibold text-blue-700 hover:text-blue-600">View all</a>
          </div>

          @if (loading()) {
            <ui-spinner />
          } @else if (error()) {
            <p class="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{{ error() }}</p>
          } @else if (!letters().length) {
            <ui-empty-state
              title="No letters yet"
              description="Create your first letter to start building a reusable application library."
              icon="FILE"
            >
              <a routerLink="/generator">
                <ui-button size="sm">Open Generator</ui-button>
              </a>
            </ui-empty-state>
          } @else {
            <div class="space-y-3">
              @for (item of recentLetters(); track item.id) {
                <a [routerLink]="['/history', item.id]" class="block rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:shadow-[0_16px_46px_-32px_rgba(37,99,235,0.45)]">
                  <div class="flex items-start justify-between gap-2">
                    <p class="line-clamp-1 text-sm font-semibold text-slate-900">{{ item.jobDescription }}</p>
                    <span class="rounded-lg bg-slate-100 px-2 py-1 text-xs font-semibold capitalize text-slate-600">{{ item.tone || 'professional' }}</span>
                  </div>
                  <p class="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{{ item.generatedText }}</p>
                  <p class="mt-3 text-xs text-slate-500">{{ item.createdAt | date: 'medium' }}</p>
                </a>
              }
            </div>
          }
        </section>

        <aside class="space-y-4">
          <article class="ui-surface p-5 sm:p-6">
            <h3 class="text-lg font-bold tracking-tight text-slate-900">Quick Start</h3>
            <p class="mt-2 text-sm leading-6 text-slate-600">Add a full job description plus your strongest resume points for higher quality output.</p>
            <a routerLink="/generator" class="mt-4 inline-flex text-sm font-semibold text-blue-700 hover:text-blue-600">Open generator -></a>
          </article>

          <article class="ui-surface p-5 sm:p-6">
            <h3 class="text-lg font-bold tracking-tight text-slate-900">Activity Snapshot</h3>
            <ul class="mt-3 space-y-2 text-sm text-slate-600">
              @for (entry of activity(); track entry) {
                <li class="ui-surface-soft px-3 py-2">{{ entry }}</li>
              }
            </ul>
          </article>
        </aside>
      </div>
    </section>
  `
})
export class DashboardPageComponent {
  private readonly coverLetterService = inject(CoverLetterService);
  readonly authService = inject(AuthService);

  readonly letters = signal<CoverLetter[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  readonly recentLetters = computed(() => this.letters().slice(0, 5));

  readonly stats = computed(() => {
    const data = this.letters();
    const now = Date.now();
    const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;

    return {
      total: data.length,
      saved: data.length,
      lastWeek: data.filter((item) => new Date(item.createdAt).getTime() >= sevenDaysAgo).length,
      latestTone: data[0]?.tone ?? 'professional'
    };
  });

  readonly activity = computed(() => {
    const data = this.recentLetters();
    if (!data.length) {
      return [
        'No activity yet',
        'Create your first letter from the generator',
        'Recent actions will appear here automatically'
      ];
    }

    return data.slice(0, 3).map((item) => {
      const tone = item.tone ? `(${item.tone})` : '(professional)';
      return `Generated letter ${tone} on ${new Date(item.createdAt).toLocaleDateString()}`;
    });
  });

  constructor() {
    this.coverLetterService.list().subscribe({
      next: (res) => {
        this.letters.set(res.data);
        this.loading.set(false);
      },
      error: (err: { error?: { message?: string } }) => {
        this.error.set(err.error?.message ?? 'Failed to load dashboard data');
        this.loading.set(false);
      }
    });
  }
}
