import { Component } from '@angular/core';
import { SectionContainerComponent } from '../../../../shared/components/section-container/section-container.component';

@Component({
  selector: 'landing-trust-section',
  standalone: true,
  imports: [SectionContainerComponent],
  template: `
    <ui-section-container spacing="sm">
      <div class="ui-surface p-5 sm:p-7">
        <p class="text-center text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Trusted by candidates applying to teams at</p>
        <div class="mt-4 grid grid-cols-2 gap-3 text-center text-sm font-semibold text-slate-700 sm:grid-cols-4">
          @for (brand of brands; track brand) {
            <p class="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 transition hover:border-blue-200 hover:bg-blue-50/50">{{ brand }}</p>
          }
        </div>
      </div>
    </ui-section-container>
  `
})
export class TrustSectionComponent {
  readonly brands = ['Stripe', 'Notion', 'HubSpot', 'Shopify'];
}
