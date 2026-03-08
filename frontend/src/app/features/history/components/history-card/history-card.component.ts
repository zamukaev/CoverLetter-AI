import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { CoverLetter } from '../../../../core/types/models';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'history-card',
  standalone: true,
  imports: [RouterLink, DatePipe, ButtonComponent],
  template: `
    <article class="ui-surface p-5 transition hover:-translate-y-0.5 hover:shadow-[0_24px_56px_-38px_rgba(37,99,235,0.45)]">
      <div class="flex items-start justify-between gap-3">
        <div>
          <p class="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">{{ displayTitle() }}</p>
          <h3 class="mt-2 line-clamp-2 text-base font-bold tracking-tight text-slate-900">{{ displaySubtitle() }}</h3>
        </div>
        <span class="rounded-lg bg-slate-100 px-2 py-1 text-xs font-semibold capitalize text-slate-600">{{ item.tone || 'professional' }}</span>
      </div>

      <p class="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{{ item.generatedText }}</p>
      <p class="mt-3 text-xs text-slate-500">{{ item.createdAt | date: 'medium' }}</p>

      <div class="mt-5 flex flex-wrap gap-2">
        <a [routerLink]="['/history', item.id]">
          <ui-button size="sm" variant="secondary">View</ui-button>
        </a>
        <a [routerLink]="['/history', item.id]">
          <ui-button size="sm" variant="ghost">Edit</ui-button>
        </a>
        <ui-button size="sm" variant="danger" (click)="delete.emit(item.id)">Delete</ui-button>
      </div>
    </article>
  `
})
export class HistoryCardComponent {
  @Input({ required: true }) item!: CoverLetter;
  @Output() readonly delete = new EventEmitter<string>();

  displayTitle(): string {
    if (this.item.companyName) return this.item.companyName;
    return this.extractAfterKeyword(' at ') || 'Saved Letter';
  }

  displaySubtitle(): string {
    if (this.item.jobTitle) return this.item.jobTitle;
    return this.extractBeforeKeyword(' at ') || this.item.jobDescription;
  }

  private extractBeforeKeyword(keyword: string): string | null {
    const text = this.item.jobDescription;
    const index = text.toLowerCase().indexOf(keyword.trim().toLowerCase());
    if (index <= 0) return null;
    return text.slice(0, Math.min(index, 60)).trim();
  }

  private extractAfterKeyword(keyword: string): string | null {
    const normalized = this.item.jobDescription.toLowerCase();
    const index = normalized.indexOf(keyword.trim().toLowerCase());
    if (index === -1) return null;
    return this.item.jobDescription.slice(index + keyword.length, index + keyword.length + 48).trim();
  }
}
