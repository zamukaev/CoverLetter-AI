import { Component, input } from '@angular/core';

@Component({
  selector: 'ui-page-header',
  standalone: true,
  template: `
    <div class="mb-8 flex flex-wrap items-end justify-between gap-5 border-b border-slate-200/80 pb-6 sm:mb-10">
      <div class="max-w-2xl">
        <p class="ui-kicker">{{ eyebrow() }}</p>
        <h1 class="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{{ title() }}</h1>
        @if (subtitle()) {
          <p class="mt-3 text-sm leading-6 text-slate-600 sm:text-base">{{ subtitle() }}</p>
        }
      </div>
      <div class="max-sm:w-full max-sm:[&_ui-button]:w-full"><ng-content /></div>
    </div>
  `
})
export class PageHeaderComponent {
  readonly title = input.required<string>();
  readonly subtitle = input<string>('');
  readonly eyebrow = input('Workspace');
}
