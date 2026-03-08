import { Component, input } from '@angular/core';

@Component({
  selector: 'ui-feature-card',
  standalone: true,
  template: `
    <article class="ui-surface h-full p-6 transition hover:-translate-y-0.5 hover:shadow-[0_30px_80px_-45px_rgba(37,99,235,0.5)]">
      <p class="mb-4 inline-flex h-11 min-w-11 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 px-3 text-xs font-bold text-blue-700">{{ icon() }}</p>
      <h3 class="text-lg font-bold tracking-tight text-slate-900">{{ title() }}</h3>
      <p class="mt-2 text-sm leading-6 text-slate-600">{{ description() }}</p>
    </article>
  `
})
export class FeatureCardComponent {
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly icon = input('AI');
}
