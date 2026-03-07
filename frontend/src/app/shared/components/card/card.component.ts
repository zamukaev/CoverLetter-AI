import { Component } from '@angular/core';

@Component({
  selector: 'ui-card',
  standalone: true,
  template: `
    <article class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_12px_45px_-28px_rgba(15,23,42,0.35)]">
      <ng-content />
    </article>
  `
})
export class CardComponent {}
