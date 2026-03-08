import { Component, input } from '@angular/core';

@Component({
  selector: 'ui-auth-card',
  standalone: true,
  template: `
    <section class="mx-auto w-full max-w-md px-4 py-14 sm:py-20">
      <div class="ui-surface overflow-hidden p-7 sm:p-9">
        <div class="mb-7 border-b border-slate-200 pb-5">
          <h1 class="text-3xl font-extrabold tracking-tight text-slate-900">{{ title() }}</h1>
          <p class="mt-2 text-sm leading-6 text-slate-600">{{ subtitle() }}</p>
        </div>
        <ng-content />
      </div>
    </section>
  `
})
export class AuthCardComponent {
  readonly title = input.required<string>();
  readonly subtitle = input.required<string>();
}
