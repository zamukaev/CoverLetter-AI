import { Component, input } from '@angular/core';

@Component({
  selector: 'ui-empty-state',
  standalone: true,
  template: `
    <div class="rounded-2xl border border-dashed border-slate-300 bg-slate-50/80 p-10 text-center">
      <h3 class="text-lg font-semibold text-slate-900">{{ title() }}</h3>
      <p class="mt-2 text-sm text-slate-600">{{ description() }}</p>
      <div class="mt-5"><ng-content /></div>
    </div>
  `
})
export class EmptyStateComponent {
  readonly title = input.required<string>();
  readonly description = input.required<string>();
}
