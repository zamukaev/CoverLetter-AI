import { CommonModule, DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CoverLetterService } from '../../../../core/services/cover-letter.service';
import type { CoverLetter } from '../../../../core/types/models';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe, SpinnerComponent, EmptyStateComponent, CardComponent],
  template: `
    <section>
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold text-slate-900">Welcome, {{ authService.user()?.name }}</h1>
          <p class="mt-1 text-slate-600">Track your cover letters and create new ones quickly.</p>
        </div>
        <a routerLink="/generator" class="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800">New Cover Letter</a>
      </div>

      <div class="mt-6 grid gap-4 sm:grid-cols-3">
        <ui-card>
          <p class="text-sm text-slate-500">Total Letters</p>
          <p class="mt-2 text-3xl font-bold text-slate-900">{{ stats().total }}</p>
        </ui-card>
        <ui-card>
          <p class="text-sm text-slate-500">Last 7 Days</p>
          <p class="mt-2 text-3xl font-bold text-slate-900">{{ stats().lastWeek }}</p>
        </ui-card>
        <ui-card>
          <p class="text-sm text-slate-500">Latest Tone</p>
          <p class="mt-2 text-3xl font-bold capitalize text-slate-900">{{ stats().latestTone }}</p>
        </ui-card>
      </div>

      <div class="mt-8">
        <div class="mb-3 flex items-center justify-between">
          <h2 class="text-lg font-semibold text-slate-900">Recent Letters</h2>
          <a routerLink="/history" class="text-sm font-semibold text-emerald-700">View all</a>
        </div>

        @if (loading()) {
          <ui-spinner />
        } @else if (error()) {
          <p class="rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700">{{ error() }}</p>
        } @else if (!letters().length) {
          <ui-empty-state
            title="No letters yet"
            description="Create your first cover letter to get started."
          >
            <a routerLink="/generator" class="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Open Generator</a>
          </ui-empty-state>
        } @else {
          <div class="grid gap-3">
            @for (letter of letters(); track letter.id) {
              <a [routerLink]="['/history', letter.id]" class="rounded-2xl border border-slate-200 bg-white p-4 hover:border-emerald-200 hover:bg-emerald-50/40">
                <p class="line-clamp-1 text-sm font-semibold text-slate-900">{{ letter.jobDescription }}</p>
                <p class="mt-1 line-clamp-2 text-sm text-slate-600">{{ letter.generatedText }}</p>
                <p class="mt-2 text-xs text-slate-500">{{ letter.createdAt | date: 'medium' }}</p>
              </a>
            }
          </div>
        }
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

  readonly stats = computed(() => {
    const data = this.letters();
    const now = Date.now();
    const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;

    return {
      total: data.length,
      lastWeek: data.filter((item) => new Date(item.createdAt).getTime() >= sevenDaysAgo).length,
      latestTone: data[0]?.tone ?? 'default'
    };
  });

  constructor() {
    this.coverLetterService.list().subscribe({
      next: (res) => {
        this.letters.set(res.data.slice(0, 5));
        this.loading.set(false);
      },
      error: (err: { error?: { message?: string } }) => {
        this.error.set(err.error?.message ?? 'Failed to load dashboard data');
        this.loading.set(false);
      }
    });
  }
}
