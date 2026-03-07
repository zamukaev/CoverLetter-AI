import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { CoverLetter } from '../../../../core/types/models';

@Component({
  selector: 'history-card',
  standalone: true,
  imports: [RouterLink, DatePipe],
  template: `
    <a [routerLink]="['/history', item.id]" class="block rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-emerald-200 hover:bg-emerald-50/40">
      <div class="flex items-start justify-between gap-4">
        <h3 class="line-clamp-2 text-sm font-semibold text-slate-900">{{ item.jobDescription }}</h3>
        <span class="rounded-lg bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 capitalize">{{ item.tone || 'default' }}</span>
      </div>
      <p class="mt-2 line-clamp-3 text-sm text-slate-600">{{ item.generatedText }}</p>
      <p class="mt-3 text-xs text-slate-500">{{ item.createdAt | date: 'medium' }}</p>
    </a>
  `
})
export class HistoryCardComponent {
  @Input({ required: true }) item!: CoverLetter;
}
