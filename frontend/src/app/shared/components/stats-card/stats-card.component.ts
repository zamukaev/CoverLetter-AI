import { Component, input } from '@angular/core';

@Component({
  selector: 'ui-stats-card',
  standalone: true,
  template: `
    <article class="ui-surface h-full p-5 sm:p-6">
      <p class="text-xs font-semibold uppercase tracking-[0.13em] text-slate-500">{{ label() }}</p>
      <p class="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{{ value() }}</p>
      @if (note()) {
        <p class="mt-2 text-xs text-slate-500">{{ note() }}</p>
      }
    </article>
  `
})
export class StatsCardComponent {
  readonly label = input.required<string>();
  readonly value = input.required<string | number>();
  readonly note = input<string>('');
}
