import { Component, input } from '@angular/core';

@Component({
  selector: 'ui-pricing-card',
  standalone: true,
  template: `
    <article
      [class]="
        featured()
          ? 'ui-surface relative overflow-hidden border-blue-200 bg-gradient-to-b from-blue-50 to-white p-7'
          : 'ui-surface p-7'
      "
    >
      @if (featured()) {
        <span class="absolute right-5 top-5 rounded-full bg-blue-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white">Popular</span>
      }
      <p class="text-sm font-semibold" [class.text-blue-700]="featured()" [class.text-slate-500]="!featured()">{{ plan() }}</p>
      <p class="mt-3 text-4xl font-extrabold tracking-tight text-slate-900">{{ price() }}</p>
      <p class="mt-3 text-sm leading-6 text-slate-600">{{ description() }}</p>
      <ul class="mt-6 space-y-2.5 text-sm text-slate-700">
        @for (item of features(); track item) {
          <li class="flex items-start gap-2">
            <span class="mt-0.5 h-5 w-5 rounded-full bg-blue-100 text-center text-xs leading-5 font-bold text-blue-700">+</span>
            <span>{{ item }}</span>
          </li>
        }
      </ul>
      <div class="mt-7">
        <ng-content />
      </div>
    </article>
  `
})
export class PricingCardComponent {
  readonly plan = input.required<string>();
  readonly price = input.required<string>();
  readonly description = input.required<string>();
  readonly features = input<string[]>([]);
  readonly featured = input(false);
}
