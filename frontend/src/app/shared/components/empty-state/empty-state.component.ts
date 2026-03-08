import { Component, input } from '@angular/core';

@Component({
  selector: 'ui-empty-state',
  standalone: true,
  template: `
    <div class="ui-surface border-dashed bg-slate-50/80 p-8 text-center sm:p-10">
      <p class="mx-auto mb-4 inline-flex h-12 min-w-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold uppercase text-slate-700 shadow-sm">{{ icon() }}</p>
      <h3 class="text-xl font-bold tracking-tight text-slate-900">{{ title() }}</h3>
      <p class="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">{{ description() }}</p>
      <div class="mt-6"><ng-content /></div>
    </div>
  `
})
export class EmptyStateComponent {
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly icon = input('NONE');
}
